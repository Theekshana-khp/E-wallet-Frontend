import "../../style/auth/register.css"
import { useNavigate } from "react-router-dom";

function Register() {
    const navigator = useNavigate();

    function handleRegister() {
        let ok = true;
        ['fname','lname','email','phone','nic'].forEach(function(id){
            let el = document.getElementById(id);
            if(!el.value.trim()){
                el.classList.add('invalid');
                ok=false;
            }else{
                el.classList.remove('invalid');
            }
        });
        if(ok){
            navigator("/");
        }
    }

    return (
        <div className="ew-bg">
            <div className="ew-title">E-Wallet</div>
            <div className="ew-card">
                <div className="ew-grid">
                    <div className="ew-field">
                        <label htmlFor="fname">First name</label>
                        <input className="ew-input" id="fname" type="text" placeholder="John" maxLength="100"/>
                    </div>
                    <div className="ew-field">
                        <label htmlFor="lname">Last name</label>
                        <input className="ew-input" id="lname" type="text" placeholder="Doe" maxLength="100"/>
                    </div>

                    <div className="ew-field">
                        <label htmlFor="dob">Date of birth</label>
                        <input className="ew-input" id="dob" type="date"/>
                    </div>
                    <div className="ew-field">
                        <label htmlFor="nic">NIC number</label>
                        <input className="ew-input" id="nic" type="text" placeholder="e.g. 200012345678"
                               maxLength="20"/>
                    </div>

                    <div className="ew-section" style ={{marginTop:"0.5rem"}}>Contact details</div>

                    <div className="ew-field ew-full">
                        <label htmlFor="email">Email address</label>
                        <input className="ew-input" id="email" type="email" placeholder="john.doe@example.com"
                               maxLength="150"/>
                    </div>
                    <div className="ew-field">
                        <label htmlFor="phone">Phone number</label>
                        <input className="ew-input" id="phone" type="tel" placeholder="+94 77 123 4567" maxLength="20"/>
                    </div>
                    <div className="ew-field">
                        <label htmlFor="status">Account status</label>
                        <select className="ew-input" id="status">
                            <option value="ACTIVE" selected>Active</option>
                            <option value="INACTIVE">Inactive</option>
                            <option value="SUSPENDED">Suspended</option>
                        </select>
                    </div>

                    <div className="ew-field ew-full">
                        <label htmlFor="address">Address</label>
                        <textarea className="ew-input" id="address" rows="2" placeholder="123 Main St, Colombo 03"
                                  style={{resize:"vertical", minHeight:"60px"}}></textarea>
                    </div>
                    <div className="ew-full">
                        <button className="ew-btn" onClick={handleRegister} >Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;