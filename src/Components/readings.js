import React, { useState} from 'react';
import './ReadingForm.css';

function ReadingForm() {
    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().split(' ')[0].substring(0, 5); // Format HH:MM
    };

    const [formData, setFormData] = useState({
        date: '',
        time: getCurrentTime(),
        type: '2-asset',
        upsType: '1',
        output_voltage_l1: '',
        output_voltage_l2: '',
        output_voltage_l3: '',
        output_current_l1: '',
        output_current_l2: '',
        output_current_l3: '',
        kw: '',
        frequency: '',
        power_factor: '',
        total_load_percent: '',
        battery_temp: '',
        ups_temp: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/api/readings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                alert('Reading data inserted successfully!');
            } else {
                const data = await response.json();
                alert(`Error: ${data}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        }
    };
    

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Date:</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Time:</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Type:</label>
                            <select name="type" value={formData.type} onChange={handleChange} required className="form-control">
                                <option value="2-asset">2-asset</option>
                                <option value="2-ro">2-ro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>UPS Type:</label>
                            <select name="upsType" value={formData.upsType} onChange={handleChange} required className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Output Voltage L1:</label>
                            <input type="number" step="0.01" name="output_voltage_l1" value={formData.output_voltage_l1} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Output Voltage L2:</label>
                            <input type="number" step="0.01" name="output_voltage_l2" value={formData.output_voltage_l2} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Output Voltage L3:</label>
                            <input type="number" step="0.01" name="output_voltage_l3" value={formData.output_voltage_l3} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Output Current L1:</label>
                            <input type="number" step="0.01" name="output_current_l1" value={formData.output_current_l1} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Output Current L2:</label>
                            <input type="number" step="0.01" name="output_current_l2" value={formData.output_current_l2} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Output Current L3:</label>
                            <input type="number" step="0.01" name="output_current_l3" value={formData.output_current_l3} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>KW:</label>
                            <input type="number" step="0.01" name="kw" value={formData.kw} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Frequency:</label>
                            <input type="number" step="0.01" name="frequency" value={formData.frequency} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Power Factor:</label>
                            <input type="number" step="0.01" name="power_factor" value={formData.power_factor} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Total Load %:</label>
                            <input type="number" step="0.01" name="total_load_percent" value={formData.total_load_percent} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Battery Temp:</label>
                            <input type="number" step="0.01" name="battery_temp" value={formData.battery_temp} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>UPS Temp:</label>
                            <input type="number" step="0.01" name="ups_temp" value={formData.ups_temp} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-primary">Submit Reading</button>
                </div>
            </form>
        </div>
    );
}

export default ReadingForm;
