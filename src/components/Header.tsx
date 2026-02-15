'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 z-50"
        >
            <div className="flex items-start justify-start">
                <div className="w-32 h-32 relative">
                    <Image
                        src="/AvlokAi.png"
                        alt="AvlokAI"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </motion.header>
    )
}