// const http = require('http');

// const port = 9005;
// const data = {
//     homeTitle: 'Welcome Students',
//     homeText: 'This webpage is created using the Node.js HTTP module. It demonstrates routing and serving HTML with simple CSS.',
//     aboutTitle: 'About Us',
//     aboutText: 'This website is developed using Node.js. It shows how to create multiple pages using the built-in HTTP module.',
//     phone: 'Contact: +91 9563279003'
// };

// const server = http.createServer((req, res) => {

//     if (req.url === '/') {

//         res.writeHead(200, { 'Content-Type': 'text/html' });

//         res.end(`
// <!DOCTYPE html>
// <html>
// <head>
//     <title>Home</title>

//     <style>
//         body{
//             font-family: Arial, sans-serif;
//             background:#f4f4f4;
//             margin:0;
//         }

//         nav{
//             background:#0077cc;
//             padding:15px;
//             text-align:center;
//         }

//         nav a{
//             color:white;
//             text-decoration:none;
//             margin:0 15px;
//             font-size:18px;
//         }

//         .container{
//             width:60%;
//             margin:60px auto;
//             background:white;
//             padding:30px;
//             border-radius:10px;
//             box-shadow:0 0 10px lightgray;
//             text-align:center;
//         }

//         h1{
//             color:#0077cc;
//         }

//         p{
//             color:#555;
//             line-height:1.6;
//         }

//         button{
//             background:#0077cc;
//             color:white;
//             border:none;
//             padding:10px 20px;
//             border-radius:5px;
//             cursor:pointer;
//         }

//         button:hover{
//             background:#005fa3;
//         }
//     </style>

// </head>

// <body>

// <nav>
//     <a href="/">Home</a>
//     <a href="/about">About</a>
// </nav>

// <div class="container">

//     <h1>${data.homeTitle}</h1>

//     <p>
//         ${data.homeText}
//     </p>

//     <a href="/about">
//         <button>About Us</button>
//     </a>

// </div>

// </body>
// </html>
// `);

//     }

//     else if (req.url === '/about') {

//         res.writeHead(200, { 'Content-Type': 'text/html' });

//         res.end(`
// <!DOCTYPE html>
// <html>
// <head>

// <title>About Us</title>

// <style>

// body{
//     font-family:Arial,sans-serif;
//     background:#eef2f7;
//     margin:0;
// }

// nav{
//     background:#0077cc;
//     padding:15px;
//     text-align:center;
// }

// nav a{
//     color:white;
//     text-decoration:none;
//     margin:0 15px;
//     font-size:18px;
// }

// .container{
//     width:60%;
//     margin:60px auto;
//     background:white;
//     padding:30px;
//     border-radius:10px;
//     box-shadow:0 0 10px lightgray;
//     text-align:center;
// }

// h1{
//     color:#e91e63;
// }

// p{
//     color:#555;
//     line-height:1.6;
// }

// .phone{
//     color:#0077cc;
//     font-weight:bold;
//     font-size:18px;
// }

// button{
//     background:#0077cc;
//     color:white;
//     border:none;
//     padding:10px 20px;
//     border-radius:5px;
//     cursor:pointer;
// }

// button:hover{
//     background:#005fa3;
// }

// </style>

// </head>

// <body>

// <nav>
//     <a href="/">Home</a>
//     <a href="/about">About</a>
// </nav>

// <div class="container">

// <h1>${data.aboutTitle}</h1>

// <p>
// ${data.aboutText}
// </p>

// <p class="phone">
// ${data.phone}
// </p>

// <a href="/">
// <button>Back to Home</button>
// </a>

// </div>

// </body>
// </html>
// `);

//     }

//     else {

//         res.writeHead(404, { 'Content-Type': 'text/html' });

//         res.end(`
//         <h1 style="text-align:center;color:red;margin-top:100px;">
//             404 - Page Not Found
//         </h1>
//         `);
//     }

// });

// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require("express");
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple CORS middleware so Thunder Client or other tools can call the API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

function calculateHRA(basic) {
    return basic * 0.20;
}

function calculateDA(basic) {
    return basic * 0.10;
}

function calculateGross(basic, hra, da) {
    return basic + hra + da;
}

app.get("/", (req, res) => {
    res.redirect("/salary-form");
});

app.get("/salary-form", (req, res) => {
    res.send(`
        <!doctype html>
        <html>
        <head>
            <title>Employee Salary Calculator</title>
            <style>
                body { font-family: Arial, sans-serif; background: #f2f4f7; margin: 0; padding: 40px; }
                .card { background: #fff; max-width: 420px; margin: auto; padding: 24px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
                .card h1 { margin-top: 0; font-size: 24px; }
                .field { margin-bottom: 16px; }
                .field input { width: 100%; padding: 10px; border: 1px solid #ccd0d7; border-radius: 4px; }
                .button { background: #007bff; color: white; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer; }
                .result { white-space: pre-wrap; background: #f8f9fb; border: 1px solid #dfe3e8; padding: 16px; border-radius: 6px; margin-top: 16px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Employee Salary Calculator</h1>
                <div class="field">
                    <label>Name</label><br>
                    <input id="name" type="text" placeholder="Enter employee name" />
                </div>
                <div class="field">
                    <label>Basic Salary</label><br>
                    <input id="basic" type="number" placeholder="Enter basic salary" />
                </div>
                <button class="button" id="calculate">Calculate Salary</button>
                <div class="result" id="result"></div>
            </div>
            <script>
                document.getElementById("calculate").addEventListener("click", async () => {
                    const name = document.getElementById("name").value.trim();
                    const basic = document.getElementById("basic").value;

                    const response = await fetch("/salary", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, basic })
                    });

                    const result = await response.json();
                    if (!response.ok) {
                        document.getElementById("result").textContent = result.error || "Something went wrong";
                    } else {
                        document.getElementById("result").textContent = JSON.stringify(result, null, 2);
                    }
                });
            </script>
        </body>
        </html>
    `);
});

app.post("/salary", (req, res) => {
    const { name, basic } = req.body;

    if (!name || basic === undefined || basic === null || basic === "") {
        return res.status(400).json({
            error: "Please provide both 'name' and 'basic' salary."
        });
    }

    const basicSalary = Number(basic);

    if (!Number.isFinite(basicSalary) || basicSalary < 0) {
        return res.status(400).json({
            error: "Please provide a valid non-negative number for 'basic'."
        });
    }

    const hra = calculateHRA(basicSalary);
    const da = calculateDA(basicSalary);
    const gross = calculateGross(basicSalary, hra, da);

    res.json({
        EmployeeName: name,
        BasicSalary: basicSalary,
        HRA: hra,
        DA: da,
        GrossSalary: gross
    });
});

// Signup form (GET) and handler (POST)
app.get('/signup', (req, res) => {
    res.send(`
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>Signup</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                :root{
                    --bg1: #f8fafc;
                    --accent: #0066ff;
                    --card:#ffffff;
                }
                *{box-sizing:border-box}
                body{font-family:'Poppins',system-ui,Segoe UI,Roboto,Arial;margin:0;background:linear-gradient(180deg, #eef2ff 0%, var(--bg1) 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
                .container{width:100%;max-width:920px;display:flex;gap:28px;align-items:center}
                .card{background:var(--card);padding:32px;border-radius:14px;box-shadow:0 12px 40px rgba(2,6,23,0.08);flex:1}
                .hero{flex:1;padding:32px}
                h1{margin:0 0 8px 0;font-size:28px;color:#0f172a}
                p.lead{margin:0 0 20px 0;color:#475569}
                form .field{margin-bottom:14px}
                input[type=text],input[type=email],input[type=password],input[type=tel]{width:100%;padding:12px 14px;border-radius:10px;border:1px solid #e6eef8;background:#fbfdff;font-size:14px}
                label{display:block;margin-bottom:6px;font-weight:600;color:#0b1220}
                .row{display:flex;gap:12px}
                .button{display:inline-block;background:var(--accent);color:#fff;padding:12px 18px;border-radius:10px;border:none;font-weight:600;cursor:pointer;box-shadow:0 8px 20px rgba(3,102,255,0.18)}
                .muted{color:#6b7280;font-size:13px}
                .links{margin-top:12px}
                a.link{color:var(--accent);text-decoration:none;font-weight:600}
                @media (max-width:800px){.container{flex-direction:column}.hero{order:2}}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <h1>Welcome</h1>
                    <p class="lead">Create your account to access the dashboard and employee tools.</p>
                    <form method="POST" action="/signup">
                        <div class="field">
                            <label for="name">Name</label>
                            <input id="name" name="name" type="text" placeholder="Your full name" required />
                        </div>
                        <div class="field">
                            <label for="email">Email</label>
                            <input id="email" name="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div class="row">
                            <div style="flex:1" class="field">
                                <label for="password">Password</label>
                                <input id="password" name="password" type="password" placeholder="Choose a strong password" required />
                            </div>
                            <div style="width:160px" class="field">
                                <label for="phone">Phone</label>
                                <input id="phone" name="phone" type="tel" placeholder="Optional" />
                            </div>
                        </div>
                        <div style="margin-top:8px">
                            <button class="button" type="submit">Create Account</button>
                        </div>
                        <div class="links muted">
                            By signing up you agree to our <a class="link" href="#">Terms</a> and <a class="link" href="#">Privacy</a>.
                        </div>
                    </form>
                </div>
                <div class="hero">
                    <h1 style="font-size:22px">Employee Tools</h1>
                    <p class="muted">Quick access to salary calculator and employee management.</p>
                    <div style="margin-top:18px">
                        <a class="button" href="/salary-form">Open Salary Calculator</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.post('/signup', (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Please provide name, email and password.');
    }

    const entry = {
        name: String(name),
        email: String(email),
        password: String(password),
        phone: phone ? String(phone) : '' ,
        createdAt: new Date().toISOString()
    };

    const line = JSON.stringify(entry) + '\n';

    fs.appendFile('users.txt', line, (err) => {
        if (err) {
            console.error('Failed to save signup:', err);
            return res.status(500).send('Failed to save signup.');
        }

        // Return an attractive success page (do not show password back)
        res.send(`
            <!doctype html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <title>Welcome ${entry.name}</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
                <style>
                    body{font-family:'Poppins',system-ui,Segoe UI,Roboto,Arial;margin:0;background:linear-gradient(180deg,#f7fffb 0%,#eef8ff 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
                    .card{background:white;padding:36px;border-radius:16px;max-width:720px;box-shadow:0 20px 60px rgba(6,15,44,0.12);text-align:center}
                    h1{margin:0 0 8px 0;color:#0b1220}
                    p{color:#475569;margin:0 0 18px 0}
                    .meta{background:#f1f8ff;padding:12px;border-radius:10px;border:1px solid #e6f0ff;margin:18px 0;text-align:left}
                    .button{display:inline-block;background:#0066ff;color:white;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:600}
                </style>
            </head>
            <body>
                <div class="card">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:12px"><circle cx="12" cy="12" r="12" fill="#e6f4ff"/><path d="M9 12.5l2 2 4-5" stroke="#0066ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <h1>Welcome, ${entry.name}!</h1>
                    <p>Your account was created successfully.</p>
                    <div class="meta">
                        <strong>Email:</strong> ${entry.email}<br>
                        <strong>Phone:</strong> ${entry.phone || '—'}<br>
                        <strong>Created:</strong> ${entry.createdAt}
                    </div>
                    <a class="button" href="/salary-form">Open Salary Calculator</a>
                </div>
            </body>
            </html>
        `);
    });
});

const itt = app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
});