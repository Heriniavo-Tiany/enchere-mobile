import { useFormInput } from "./utils";

export const useSignupFields = () => {

    return [
        {
            id: "name",
            label: "Nom",
            required: true,
            input: {
                
                props: {
                    
                    type: "text",
                    placeholder: "Joe Bloggs"
                },
                state: useFormInput("")
            }
        },
        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                
                props: {
                    
                    type: "email",
                    placeholder: "joe@bloggs.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "contact",
            label: "Contact",
            required: true,
            input: {

                props: {

                    type: "text",
                    placeholder: "+261 34 00 000 00"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Mot de Passe",
            required: true,
            input: {
                
                props: {
                    
                    type: "password",
                    placeholder: "*********"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const useLoginFields = () => {

    return [

        {
            id: "email",
            label: "Email",
            required: false,
            input: {
                props: {
                    type: "email",
                    placeholder: "joe@bloggs.com",
                    value: "jean@gmail.com"
                },
                state: useFormInput("jean@gmail.com")
            }
        },
        {
            id: "password",
            label: "Mot de Passe",
            required: false,
            input: {
                props: {
                    type: "password",
                    placeholder: "*******",
                    value: "jean"
                },
                state: useFormInput("Jean")
            }
        }
    ];
}