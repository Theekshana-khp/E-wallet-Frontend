import "../../style/auth/register.css"
import { useNavigate } from "react-router-dom";
import keycloak from "../../keycloak/keycloak";

function Register() {
    const navigator = useNavigate();

    function handleRegister() {
        let userData={};

        let ok = true;
        ['firstName','lastName','email','phone','nic','dateOfBirth'].forEach((id)=>{
            let el = document.getElementById(id);
            if(!el.value.trim()){
                el.classList.add('invalid');
                ok=false;
            }else{
                userData[id] = el.value.trim();
                el.classList.remove('invalid');
            }
        });
        if(ok){
            console.log(userData);
            fetch("http://localhost:8085/user/add",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${keycloak.token}`
                },
                body:JSON.stringify(userData)
            }).then(res => res.json()).then(data => {
                if(data.status === "success"){
                    alert("Account created successfully");
                    navigator("/");
                }else{
                    alert("Account creation failed");
                }
            })
        }
    }

    return (
        <div className="ew-bg">
            <div className="ew-title">E-Wallet</div>
            <div className="ew-card">
                <div className="ew-grid">
                    <div className="ew-section" style ={{marginTop:"0.5rem"}}>User Basic details</div>
                    <div className="ew-field">
                        <label htmlFor="first_name">First name</label>
                        <input className="ew-input" id="firstName" type="text" placeholder="John" maxLength="100"/>
                    </div>
                    <div className="ew-field">
                        <label htmlFor="lAST_name">Last name</label>
                        <input className="ew-input" id="lastName" type="text" placeholder="Doe" maxLength="100"/>
                    </div>

                    <div className="ew-field">
                        <label htmlFor="dob">Date of birth</label>
                        <input className="ew-input" id="dateOfBirth" type="date"/>
                    </div>
                    <div className="ew-field">
                        <label htmlFor="nic">NIC number</label>
                        <input className="ew-input" id="nic" type="text" placeholder="e.g. 200012345678"
                               maxLength="20"/>
                    </div>

                    <div className="ew-section" style ={{marginTop:"0.5rem"}}>Contact details</div>

                    <div className="ew-field ew-full" style={{display:"flex", flexDirection:"row",width:"100%"}}>
                        <div>
                            <label htmlFor="email" style={{flex:"1"}}>Email address</label>
                            <input className="ew-input" id="email" type="email" placeholder="john.doe@example.com"
                                   maxLength="150"/>
                        </div>
                        <div className="ew-field" style={{flex:"1"}}>
                            <label htmlFor="phone">Phone number</label>
                            <input className="ew-input" id="phone" type="tel" placeholder="+94 77 123 4567" maxLength="20"/>
                        </div>
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