import instances from "../../resources/instances.json"

class CredentialsManager{

    static credentials(key) {        
        switch(key) {
            case 'user-two': 
                return instances.ValidCredentialsTwo
            case 'user-three':
                return instances.ValidCredentialsThree
            case 'user-four':
                return instances.ValidCredentialsFour
            case 'user-five':
                return instances.ValidCredentialsFive
            case 'user-six':
                return instances.ValidCredentialsSix
            case 'user-seven':
                return instances.ValidCredentialsSeven
            case 'invalid-email':
                return instances.InvalidEmail
            case 'invalid-pass':
                return instances.InvalidPassword
            case 'invalid-password':
                return instances.InvalidPasswordTwo
        }
    }
}

export default CredentialsManager