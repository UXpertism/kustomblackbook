require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// MongoDB connection using the provided connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.wqyxoom.mongodb.net/kbb?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a schema for form data
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    audio_system: {
        amp: String,
        amp_size: String,
    },
    body: {
        bumpers: String,
        doors: String,
        fenders: String,
        quarters: String,
    },
    chassis: {
        brakes: String,
        brake_system: String,
        chassis: String,
        lower_control_arm: String,
        steering: String,
        suspension: String,
        upper_control_arm: String,
    },
    exterior: {
        engine_bay: String,
        hood: String,
        top: String,
        trunk_lid: String,
        trunk_pan: String,
        tub: String,
    },
    glass: {
        rear_glass: String,
        windows: String,
        windshield: String,
    },
    interior: {
        air_heat: String,
        carpet: String,
        console: String,
        dash_tacs: String,
        door_panels: String,
        glove_box: String,
        interior: String,
        power_locks: String,
        power_window: String,
        roof: String,
        seats: String,
        steering_wheel: String,
    },
    paint: {
        paint_color: String,
        paint_finish: String,
        paint_type: String,
    },
    transmission: {
        transmission: String,
        transmission_type: String,
    },
    vehicle: {
        boost: String,
        engine: String,
        make: String,
        model: String,
        posi: String,
        rear_diff: String,
        awd_4x4: String,
        start_option: String,
        type_badge: String,
        year: String,
    },
    wheels: {
        tire_size: String,
        wheel_brand: String,
        wheel_offset: String,
        wheel_stagger: String,
        wheel_type: String,
        wheels_size: String,
    },
});

const FormData = mongoose.model('FormData', formSchema);

// Use EJS for templating and set static folder
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Home route to display the form
app.get('/', (req, res) => {
    res.render('index');
});

// Configure Nodemailer with your custom email server
const transporter = nodemailer.createTransport({
    host: 'mail.xtud.io',
    port: 465,
    secure: true, // Use true for port 465 (SSL)
    auth: {
        user: 'support@xtud.io', // Your email
        pass: process.env.EMAIL_PASS // Your email password (from .env file)
    }
});

// Route to handle form submission and display results
app.post('/results', async (req, res) => {
    const formData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        audio_system: {
            amp: req.body.amp,
            amp_size: req.body.amp_size,
        },
        body: {
            bumpers: req.body.bumpers,
            doors: req.body.doors,
            fenders: req.body.fenders,
            quarters: req.body.quarters,
        },
        chassis: {
            brakes: req.body.brakes,
            brake_system: req.body.brake_system,
            chassis: req.body.chassis,
            lower_control_arm: req.body.lower_control_arm,
            steering: req.body.steering,
            suspension: req.body.suspension,
            upper_control_arm: req.body.upper_control_arm,
        },
        exterior: {
            engine_bay: req.body.engine_bay,
            hood: req.body.hood,
            top: req.body.top,
            trunk_lid: req.body.trunk_lid,
            trunk_pan: req.body.trunk_pan,
            tub: req.body.tub,
        },
        glass: {
            rear_glass: req.body.rear_glass,
            windows: req.body.windows,
            windshield: req.body.windshield,
        },
        interior: {
            air_heat: req.body.air_heat,
            carpet: req.body.carpet,
            console: req.body.console,
            dash_tacs: req.body.dash_tacs,
            door_panels: req.body.door_panels,
            glove_box: req.body.glove_box,
            interior: req.body.interior,
            power_locks: req.body.power_locks,
            power_window: req.body.power_window,
            roof: req.body.roof,
            seats: req.body.seats,
            steering_wheel: req.body.steering_wheel,
        },
        paint: {
            paint_color: req.body.paint_color,
            paint_finish: req.body.paint_finish,
            paint_type: req.body.paint_type,
        },
        transmission: {
            transmission: req.body.transmission,
            transmission_type: req.body.transmission_type,
        },
        vehicle: {
            boost: req.body.boost,
            engine: req.body.engine,
            make: req.body.make,
            model: req.body.model,
            posi: req.body.posi,
            rear_diff: req.body.rear_diff,
            awd_4x4: req.body.awd_4x4,
            start_option: req.body.start_option,
            type_badge: req.body.type_badge,
            year: req.body.year,
        },
        wheels: {
            tire_size: req.body.tire_size,
            wheel_brand: req.body.wheel_brand,
            wheel_offset: req.body.wheel_offset,
            wheel_stagger: req.body.wheel_stagger,
            wheel_type: req.body.wheel_type,
            wheels_size: req.body.wheels_size,
        },
    };

    try {
        // Save form data to MongoDB
        const newFormData = new FormData(formData);
        await newFormData.save();

        // Send an email to 'tchadb@gmail.com'
        const emailBody = `
        <h1>Custom Vehicle Request</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        
        <h3>Audio System</h3>
        <p><strong>Amplifier:</strong> ${formData.audio_system.amp}</p>
        <p><strong>Amplifier Size:</strong> ${formData.audio_system.amp_size}</p>
    
        <h3>Body Information</h3>
        <p><strong>Bumpers:</strong> ${formData.body.bumpers}</p>
        <p><strong>Doors:</strong> ${formData.body.doors}</p>
        <p><strong>Fenders:</strong> ${formData.body.fenders}</p>
        <p><strong>Quarters:</strong> ${formData.body.quarters}</p>
    
        <h3>Chassis Information</h3>
        <p><strong>Brakes:</strong> ${formData.chassis.brakes}</p>
        <p><strong>Brake System:</strong> ${formData.chassis.brake_system}</p>
        <p><strong>Chassis:</strong> ${formData.chassis.chassis}</p>
        <p><strong>Lower Control Arm:</strong> ${formData.chassis.lower_control_arm}</p>
        <p><strong>Steering:</strong> ${formData.chassis.steering}</p>
        <p><strong>Suspension:</strong> ${formData.chassis.suspension}</p>
        <p><strong>Upper Control Arm:</strong> ${formData.chassis.upper_control_arm}</p>
    
        <h3>Exterior Information</h3>
        <p><strong>Engine Bay:</strong> ${formData.exterior.engine_bay}</p>
        <p><strong>Hood:</strong> ${formData.exterior.hood}</p>
        <p><strong>Top:</strong> ${formData.exterior.top}</p>
        <p><strong>Trunk Lid:</strong> ${formData.exterior.trunk_lid}</p>
        <p><strong>Trunk Pan:</strong> ${formData.exterior.trunk_pan}</p>
        <p><strong>Tub:</strong> ${formData.exterior.tub}</p>
    
        <h3>Glass Information</h3>
        <p><strong>Rear Glass:</strong> ${formData.glass.rear_glass}</p>
        <p><strong>Windows:</strong> ${formData.glass.windows}</p>
        <p><strong>Windshield:</strong> ${formData.glass.windshield}</p>
    
        <h3>Interior Information</h3>
        <p><strong>Air/Heat:</strong> ${formData.interior.air_heat}</p>
        <p><strong>Carpet:</strong> ${formData.interior.carpet}</p>
        <p><strong>Console:</strong> ${formData.interior.console}</p>
        <p><strong>Dash/Tacs/Meters:</strong> ${formData.interior.dash_tacs}</p>
        <p><strong>Door Panels:</strong> ${formData.interior.door_panels}</p>
        <p><strong>Glove Box:</strong> ${formData.interior.glove_box}</p>
        <p><strong>Interior:</strong> ${formData.interior.interior}</p>
        <p><strong>Power Locks:</strong> ${formData.interior.power_locks}</p>
        <p><strong>Power Windows:</strong> ${formData.interior.power_window}</p>
        <p><strong>Roof:</strong> ${formData.interior.roof}</p>
        <p><strong>Seats:</strong> ${formData.interior.seats}</p>
        <p><strong>Steering Wheel:</strong> ${formData.interior.steering_wheel}</p>
    
        <h3>Paint Information</h3>
        <p><strong>Paint Color:</strong> ${formData.paint.paint_color}</p>
        <p><strong>Paint Finish:</strong> ${formData.paint.paint_finish}</p>
        <p><strong>Paint Type:</strong> ${formData.paint.paint_type}</p>
    
        <h3>Transmission Information</h3>
        <p><strong>Transmission:</strong> ${formData.transmission.transmission}</p>
        <p><strong>Transmission Type (Manual/Automatic):</strong> ${formData.transmission.transmission_type}</p>
    
        <h3>Vehicle Information</h3>
        <p><strong>Boost:</strong> ${formData.vehicle.boost}</p>
        <p><strong>Engine:</strong> ${formData.vehicle.engine}</p>
        <p><strong>Make:</strong> ${formData.vehicle.make}</p>
        <p><strong>Model:</strong> ${formData.vehicle.model}</p>
        <p><strong>Posi:</strong> ${formData.vehicle.posi}</p>
        <p><strong>Rear Differential:</strong> ${formData.vehicle.rear_diff}</p>
        <p><strong>AWD/4x4:</strong> ${formData.vehicle.awd_4x4}</p>
        <p><strong>Start Option (Key/Push Button):</strong> ${formData.vehicle.start_option}</p>
        <p><strong>Type Badge:</strong> ${formData.vehicle.type_badge}</p>
        <p><strong>Year:</strong> ${formData.vehicle.year}</p>
    
        <h3>Wheels and Tires</h3>
        <p><strong>Tire Size:</strong> ${formData.wheels.tire_size}</p>
        <p><strong>Wheel Brand:</strong> ${formData.wheels.wheel_brand}</p>
        <p><strong>Wheel Offset:</strong> ${formData.wheels.wheel_offset}</p>
        <p><strong>Wheel Stagger:</strong> ${formData.wheels.wheel_stagger}</p>
        <p><strong>Wheel Type:</strong> ${formData.wheels.wheel_type}</p>
        <p><strong>Wheel Size:</strong> ${formData.wheels.wheels_size}</p>
    `;
    

        // Send the formatted email to 'tchadb@gmail.com'
        const mailOptions = {
            from: 'support@xtud.io',
            to: 'tchadb@gmail.com', // Automatically send to this email
            subject: 'New Custom Vehicle Request',
            html: emailBody // Send formatted HTML email
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent to tchadb@gmail.com: ' + info.response);
                res.render('results', { formData: formData });
            }
        });

    } catch (error) {
        res.status(500).send('Error saving form data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
