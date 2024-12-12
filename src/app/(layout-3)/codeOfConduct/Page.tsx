import React from 'react';

const Tizaraa = () => {
    return (
        <>
            <header>
                <div
                    style={{
                        backgroundColor: '#f8f8f8',
                        borderBottom: '1px solid #ddd',
                        padding: '10px 20px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            maxWidth: '1200px',
                            margin: '0 auto',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '10px' }}>
                                <a href="index.html">
                                    <img
                                        src="assets/img/logo/Logo_14.11.2023.png"
                                        alt="Full Logo"
                                        style={{ height: '50px' }}
                                    />
                                </a>
                            </div>
                            <div>
                                <a href="index.html">
                                    <img
                                        src="assets/img/logo/Logo Icon_14.11.2023.png"
                                        alt="Half Logo"
                                        style={{ height: '30px' }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '20px', position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    style={{
                                        padding: '8px 12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        width: '200px',
                                    }}
                                />
                                <button
                                    style={{
                                        marginLeft: '5px',
                                        padding: '8px 12px',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Search
                                </button>
                            </div>
                            <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
                                <li style={{ marginRight: '15px' }}>
                                    <select style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                        <option>English</option>
                                        <option>Bengali</option>
                                        <option>Arabic</option>
                                        <option>Japanese</option>
                                    </select>
                                </li>
                                <li style={{ marginRight: '15px' }}>
                                    <a href="login.html" style={{ textDecoration: 'none', color: '#333' }}>
                                        Login
                                    </a>
                                </li>
                                <li style={{ marginRight: '15px' }}>
                                    <a href="sign-up.html" style={{ textDecoration: 'none', color: '#333' }}>
                                        Sign up
                                    </a>
                                </li>
                                <li>
                                    <a href="#" style={{ textDecoration: 'none', color: '#333' }}>
                                        Cart
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div
                    style={{
                        backgroundImage: 'url(assets/img/banner/Tizaraa-Code-of-Conduct.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                >
                    <h2>Tizaraa Code of Conduct</h2>
                </div>
                <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                    <div>
                        <h4>INTRODUCTION</h4>
                        <p>
                            Welcome to Tizaraa! Our community is built on trust, respect, and collaboration. To ensure a
                            positive experience for everyone, we have established this Code of Conduct that outlines the
                            standards and behavior expected from all members of the Tizaraa community, including buyers,
                            sellers, and visitors.
                        </p>
                    </div>
                    {/* Repeat similar structure for other sections */}
                </div>
            </main>
            <footer
                style={{
                    backgroundColor: '#f8f8f8',
                    borderTop: '1px solid #ddd',
                    padding: '20px 0',
                    textAlign: 'center',
                }}
            >
                <div>
                    <p style={{ margin: 0 }}>&copy; Tizaraa 2023</p>
                </div>
            </footer>
        </>
    );
};

export default Tizaraa;
