"use client"
import React from 'react'
import Link from 'next/link'


const NavBar = () => {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/sign-up', label: 'Sign Up' },
        { href: '/sign-in', label: 'Log In' },
        { href: '/user-profile', label: 'Profile' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/projects', label: 'Projects' },
        { href: '/about', label: 'About' },
    ]

    return (
        <div>
            <div className="navbar space-x-4">
                {links.map(link => (
                    <Link href={link.href} key={link.label}>
                        {link.label}  
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default NavBar