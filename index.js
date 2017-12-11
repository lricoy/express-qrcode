const { promisify } = require('util')
const PORT = process.env.PORT || 3000

// QRCode generation requirements
const QRCode = require('qrcode')
const genDataUrl = promisify(QRCode.toDataURL.bind(QRCode))

// Express requirements
const bodyParser = require('body-parser')
const express = require('express')

// Configure Express app
const app = express()
app.use(bodyParser.json())

/**
 * Receives a POST request with a body that contains a 'payload' attribute
 * and returns the base64 data-url.
 * @returns {{ src: String }}
 */
app.post('/', async (req, res) => {
    const { payload = '' } = req.body

    if (payload === '') {
        return res
            .status(422)
            .json({ err: 'Missing required parameter: "payload"' })
    }

    const dataUrl = await genDataUrl(payload)

    return res.json({ src: dataUrl })
})

app.listen(
    PORT,
    () => {
        console.log('Server is running')
    }
)