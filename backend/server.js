// Cargar variables de entorno
const path = require('path');
const fs = require('fs');

// Cargar .env desde la carpeta backend
const envPath = path.join(__dirname, '.env');
console.log('📁 Buscando archivo .env en:', envPath);

// Intentar cargar el .env
require('dotenv').config({ path: envPath });

// Verificar si el archivo existe
if (fs.existsSync(envPath)) {
    console.log('✅ Archivo .env encontrado');
    // Leer el contenido para verificar
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('📄 Contenido del .env (ocultando valores sensibles):');
    envContent.split('\n').forEach((line, index) => {
        if (line.trim() && !line.trim().startsWith('#')) {
            const [key] = line.split('=');
            if (key) {
                console.log(`   ${key.trim()}: ${process.env[key.trim()] ? '✅ Configurado' : '❌ No configurado'}`);
            }
        }
    });
} else {
    console.warn('⚠️  Archivo .env NO encontrado en:', envPath);
    console.warn('   Por favor, crea el archivo .env en la carpeta backend con:');
    console.warn('   BREVO_API_KEY=tu_api_key');
    console.warn('   BREVO_SENDER_EMAIL=hexalogic20@gmail.com');
    console.warn('   BREVO_SENDER_NAME=HexaLogic');
}

// Debug: Verificar si las variables se cargaron
console.log('\n🔍 Verificando variables de entorno cargadas:');
console.log('   BREVO_API_KEY:', process.env.BREVO_API_KEY ? '✅ Configurada (longitud: ' + process.env.BREVO_API_KEY.length + ')' : '❌ No configurada');
console.log('   BREVO_SENDER_EMAIL:', process.env.BREVO_SENDER_EMAIL || '❌ No configurada (usando default: hexalogic20@gmail.com)');
console.log('   BREVO_SENDER_NAME:', process.env.BREVO_SENDER_NAME || '❌ No configurada (usando default: HexaLogic)');
console.log('');

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de Brevo desde variables de entorno
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SMTP_KEY = process.env.BREVO_SMTP_KEY; // SMTP Key diferente de la API Key
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'hexalogic20@gmail.com';
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'HexaLogic';

// Configurar el transporter de nodemailer con Brevo usando SMTP
// NOTA: Para SMTP, usa la SMTP Key (no la API Key) como contraseña
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
        user: BREVO_SENDER_EMAIL,
        pass: BREVO_SMTP_KEY || BREVO_API_KEY // Usa SMTP Key si está disponible, sino API Key
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Función alternativa para enviar usando la API de Brevo directamente
async function sendEmailViaBrevoAPI(formData) {
    const { nombre, email, telefono, empresa, servicio, mensaje } = formData;
    
    const emailData = {
        sender: {
            name: BREVO_SENDER_NAME,
            email: BREVO_SENDER_EMAIL
        },
        to: [{
            email: BREVO_SENDER_EMAIL,
            name: 'HexaLogic'
        }],
        replyTo: {
            email: email,
            name: nombre
        },
        subject: `Nuevo contacto desde HexaLogic - ${nombre}`,
        htmlContent: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4169E1 0%, #1e3a8a 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
        }
        .info-section {
            background-color: #f9fafb;
            border-left: 4px solid #4169E1;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #6b7280;
            min-width: 140px;
            font-size: 14px;
        }
        .info-value {
            color: #111827;
            font-size: 14px;
            flex: 1;
        }
        .message-section {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        .message-section h3 {
            margin: 0 0 15px 0;
            color: #111827;
            font-size: 16px;
            font-weight: 600;
        }
        .message-content {
            color: #374151;
            font-size: 15px;
            line-height: 1.8;
            white-space: pre-wrap;
        }
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
        }
        .badge {
            display: inline-block;
            background-color: #4169E1;
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
            <p>Formulario de contacto - HexaLogic</p>
        </div>
        
        <div class="content">
            <div class="info-section">
                <div class="info-row">
                    <div class="info-label">👤 Nombre:</div>
                    <div class="info-value">${nombre}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">📧 Email:</div>
                    <div class="info-value">
                        <a href="mailto:${email}" style="color: #4169E1; text-decoration: none;">${email}</a>
                    </div>
                </div>
                ${telefono ? `
                <div class="info-row">
                    <div class="info-label">📱 Teléfono:</div>
                    <div class="info-value">
                        <a href="tel:${telefono}" style="color: #4169E1; text-decoration: none;">${telefono}</a>
                    </div>
                </div>
                ` : ''}
                ${empresa ? `
                <div class="info-row">
                    <div class="info-label">🏢 Empresa:</div>
                    <div class="info-value">${empresa}</div>
                </div>
                ` : ''}
                ${servicio ? `
                <div class="info-row">
                    <div class="info-label">🎯 Servicio:</div>
                    <div class="info-value">
                        ${servicio}
                        <span class="badge">Interés</span>
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="message-section">
                <h3>💬 Mensaje:</h3>
                <div class="message-content">${String(mensaje).replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de HexaLogic</p>
            <p style="margin-top: 8px;">Puedes responder directamente a este correo para contactar a ${nombre}</p>
        </div>
    </div>
</body>
</html>
        `
    };

    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(emailData);
        
        const options = {
            hostname: 'api.brevo.com',
            port: 443,
            path: '/v3/smtp/email',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                console.log('Respuesta de Brevo API:', res.statusCode);
                console.log('Datos de respuesta:', data);
                
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    const responseData = JSON.parse(data);
                    console.log('Correo aceptado por Brevo. Message ID:', responseData.messageId);
                    resolve(responseData);
                } else {
                    console.error('Error de Brevo API:', res.statusCode, data);
                    let errorMsg = `Brevo API error: ${res.statusCode}`;
                    try {
                        const errorData = JSON.parse(data);
                        if (errorData.message) {
                            errorMsg += ` - ${errorData.message}`;
                        }
                        if (res.statusCode === 401) {
                            errorMsg += ' (API Key inválida o no autorizada)';
                        } else if (res.statusCode === 400) {
                            errorMsg += ' (Verifica que el email remitente esté verificado en Brevo)';
                        }
                    } catch (e) {
                        errorMsg += ` - ${data}`;
                    }
                    reject(new Error(errorMsg));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// Ruta para enviar el correo
app.post('/api/send-email', async (req, res) => {
    try {
        console.log('Solicitud recibida:', req.body);
        
        const { nombre, email, telefono, empresa, servicio, mensaje } = req.body;

        // Validar campos requeridos
        if (!nombre || !email || !mensaje) {
            console.log('Validación fallida - campos faltantes');
            return res.status(400).json({ 
                success: false, 
                message: 'Por favor, completa todos los campos requeridos.' 
            });
        }

        // Validar que la API Key esté configurada
        if (!BREVO_API_KEY) {
            console.error('❌ BREVO_API_KEY no está configurada en las variables de entorno');
            return res.status(500).json({ 
                success: false, 
                message: 'Error de configuración: BREVO_API_KEY no está configurada. Por favor, configura las variables de entorno.' 
            });
        }

        console.log('Intentando enviar correo usando Brevo API...');
        console.log('Destinatario:', BREVO_SENDER_EMAIL);
        console.log('Remitente:', BREVO_SENDER_EMAIL);
        console.log('API Key configurada:', BREVO_API_KEY ? 'Sí (longitud: ' + BREVO_API_KEY.length + ')' : 'No');
        
        // Intentar primero con la API de Brevo (más confiable con API Key)
        try {
            const result = await sendEmailViaBrevoAPI({ nombre, email, telefono, empresa, servicio, mensaje });
            console.log('✅ Correo enviado exitosamente vía Brevo API:', result);
            console.log('⚠️  IMPORTANTE: Verifica tu bandeja de entrada y carpeta de SPAM');
            console.log('   Si no recibes el correo, verifica que el email remitente esté verificado en Brevo');
        } catch (apiError) {
            console.error('❌ Error con Brevo API:', apiError.message);
            console.log('Intentando con SMTP como respaldo...');
            
            // Si falla la API, intentar con SMTP
            const mailOptions = {
                from: `${BREVO_SENDER_NAME} <${BREVO_SENDER_EMAIL}>`,
                to: BREVO_SENDER_EMAIL,
                subject: `Nuevo contacto desde HexaLogic - ${nombre}`,
                html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4169E1 0%, #1e3a8a 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .content {
            padding: 30px;
        }
        .info-section {
            background-color: #f9fafb;
            border-left: 4px solid #4169E1;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #6b7280;
            min-width: 140px;
            font-size: 14px;
        }
        .info-value {
            color: #111827;
            font-size: 14px;
            flex: 1;
        }
        .message-section {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        .message-section h3 {
            margin: 0 0 15px 0;
            color: #111827;
            font-size: 16px;
            font-weight: 600;
        }
        .message-content {
            color: #374151;
            font-size: 15px;
            line-height: 1.8;
        }
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
        </div>
        <div class="content">
            <div class="info-section">
                <div class="info-row">
                    <div class="info-label">👤 Nombre:</div>
                    <div class="info-value">${nombre}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">📧 Email:</div>
                    <div class="info-value"><a href="mailto:${email}" style="color: #4169E1;">${email}</a></div>
                </div>
                ${telefono ? `<div class="info-row"><div class="info-label">📱 Teléfono:</div><div class="info-value">${telefono}</div></div>` : ''}
                ${empresa ? `<div class="info-row"><div class="info-label">🏢 Empresa:</div><div class="info-value">${empresa}</div></div>` : ''}
                ${servicio ? `<div class="info-row"><div class="info-label">🎯 Servicio:</div><div class="info-value">${servicio}</div></div>` : ''}
            </div>
            <div class="message-section">
                <h3>💬 Mensaje:</h3>
                <div class="message-content">${String(mensaje).replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de HexaLogic</p>
        </div>
    </div>
</body>
</html>
                `,
                replyTo: email
            };
            
            // Enviar el correo vía SMTP
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado exitosamente vía SMTP:', info.messageId);
        }

        res.json({ 
            success: true, 
            message: '¡Mensaje enviado exitosamente! Te responderemos pronto.' 
        });
    } catch (error) {
        console.error('Error completo al enviar el correo:', error);
        console.error('Código de error:', error.code);
        console.error('Mensaje de error:', error.message);
        
        let errorMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
        
        // Mensajes de error más específicos
        if (error.code === 'EAUTH' || error.message.includes('Invalid login') || error.message.includes('authentication') || error.message.includes('401')) {
            errorMessage = 'Error de autenticación con Brevo. Verifica que tu API Key sea correcta y que el email esté verificado en tu cuenta de Brevo.';
            console.error('💡 SOLUCIÓN:');
            console.error('   1. Verifica que BREVO_API_KEY en tu archivo .env sea correcta');
            console.error('   2. Ve a https://app.brevo.com/settings/keys/api y copia tu API Key');
            console.error('   3. Verifica que el email ' + BREVO_SENDER_EMAIL + ' esté verificado en Brevo');
            console.error('   4. Ve a https://app.brevo.com/settings/senders para verificar tu email');
        } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
            errorMessage = 'Error de conexión con el servidor de Brevo. Verifica tu conexión a internet.';
        } else if (error.message.includes('Brevo API error')) {
            if (error.message.includes('401')) {
                errorMessage = 'Error de autenticación: API Key inválida. Verifica tu BREVO_API_KEY en el archivo .env';
            } else if (error.message.includes('400')) {
                errorMessage = 'Error: El email remitente no está verificado en Brevo. Verifica ' + BREVO_SENDER_EMAIL + ' en tu cuenta de Brevo.';
            } else {
                errorMessage = `Error de Brevo: ${error.message}. Verifica tu API Key y que el email remitente esté verificado.`;
            }
        } else if (error.message) {
            errorMessage = `Error: ${error.message}`;
        }
        
        res.status(500).json({ 
            success: false, 
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend corriendo en http://0.0.0.0:${PORT}`);
    console.log(`✅ Configurado con Brevo (Sendinblue) para envío de correos`);
    console.log(`   Email remitente: ${BREVO_SENDER_EMAIL}`);
    console.log(`   Método: API de Brevo (con fallback a SMTP)\n`);
});


