import React, { useState } from "react";
import { PasswordStrengthMeter } from "../src";

const PasswordStregthMeterApp = () => {
    const [password, setPassword] = useState('aaa');

    return (
        <div>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={{ width: '10vw' }}>
                <PasswordStrengthMeter password={password} />
            </div>
        </div>
    );
}

export default PasswordStregthMeterApp;