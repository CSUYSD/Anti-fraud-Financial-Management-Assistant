import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { gapi } from 'gapi-script'

const libraries = ["places"]

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(null)

    const mapContainerStyle = useMemo(() => ({
        width: '100%',
        height: '450px'
    }), [])

    const center = useMemo(() => ({
        lat: -33.8882,
        lng: 151.1871
    }), [])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        setError(null)
        try {
            await sendEmail(formData)
            setIsSuccess(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            console.error('Error sending email:', error)
            setError('Failed to send email. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const sendEmail = useCallback(async (data) => {
        const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
        const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
        const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
        const SCOPES = 'https://www.googleapis.com/auth/gmail.send'

        try {
            await new Promise((resolve, reject) => {
                gapi.load('client:auth2', async () => {
                    try {
                        await gapi.client.init({
                            apiKey: API_KEY,
                            clientId: CLIENT_ID,
                            discoveryDocs: [DISCOVERY_DOC],
                            scope: SCOPES,
                        })

                        const authInstance = gapi.auth2.getAuthInstance()
                        if (!authInstance.isSignedIn.get()) {
                            await authInstance.signIn()
                        }

                        const message = `From: ${data.name} <${data.email}>\r\n` +
                            `To: recipient@example.com\r\n` +
                            `Subject: ${data.subject}\r\n\r\n` +
                            `${data.message}`

                        const encodedMessage = btoa(message)
                            .replace(/\+/g, '-')
                            .replace(/\//g, '_')
                            .replace(/=+$/, '')

                        await gapi.client.gmail.users.messages.send({
                            userId: 'me',
                            resource: {
                                raw: encodedMessage
                            }
                        })

                        resolve()
                    } catch (error) {
                        reject(error)
                    }
                })
            })
        } catch (error) {
            console.error('Error in sendEmail:', error)
            throw error
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    className="text-4xl font-bold text-white text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Contact Us
                </motion.h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-white rounded-lg shadow-xl overflow-hidden"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputField
                                    label="Subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden text-white"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <ContactInfo icon={<Mail className="h-6 w-6" />} text="support@example.com" />
                                <ContactInfo icon={<Phone className="h-6 w-6" />} text="+61 2 9351 2222" />
                                <ContactInfo icon={<MapPin className="h-6 w-6" />} text="The University of Sydney, Camperdown NSW 2006, Australia" />
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className="mt-12 bg-white rounded-lg shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Find Us</h2>
                        <LoadScript
                            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                            libraries={libraries}
                        >
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={15}
                            >
                                <Marker position={center} />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
                            <p className="text-gray-600 mb-6">Your message has been sent successfully.</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const InputField = ({ label, name, type = "text", value, onChange, required }) => (
    <div className="mb-6">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
        />
    </div>
)

const ContactInfo = ({ icon, text }) => (
    <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
            {icon}
        </div>
        <p>{text}</p>
    </div>
)