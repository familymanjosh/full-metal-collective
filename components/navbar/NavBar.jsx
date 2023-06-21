"use client"
import React from 'react'
import Link from 'next/link'

const NavBar = () => {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/reviews', label: 'Reviews' },
        { href: '/history', label: 'History' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/signup', label: 'Sign Up' },
        { href: '/dashboard/login', label: 'Log In' },
        { href: '/dashboard/logout', label: 'Log Out' },
    ]

    return (
        <div className="navbar space-x-4">
                {links.map(link => (
                    <Link href={link.href} key={link.label}>
                        {link.label}  
                        </Link>
                ))}
        </div>
    )
}

export default NavBar