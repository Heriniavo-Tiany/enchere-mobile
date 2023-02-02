import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import styles from './Signup.module.scss';

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useSignupFields } from '../data/fields';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';
import { useEffect, useState } from 'react';
import { validateForm } from '../data/utils';
import {useHistory, useParams} from 'react-router';
import axios from "axios";
import {API_URL} from "../config";

const Signup = () => {
    const history = useHistory();

    const params = useParams();
    const fields = useSignupFields();
    const [ errors, setErrors ] = useState(false);

    const createAccount = async () => {

        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length) {
            const params = {
                nom: fields[0].input.state.value,
                email: fields[1].input.state.value,
                motDePasse: fields[3].input.state.value,
                contact: fields[2].input.state.value
            };

            try {
                const response = await axios.post(`${API_URL}/utilisateurs`, {}, {params});
                if (response.status === 200) {
                    console.log(response.data);
                    // history.push(`/login`);
                }
            } catch (error) {
                console.log(error);
            }

        }
    }

    useEffect(() => {

        return () => {

            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);
	
	return (
		<IonPage className={ styles.signupPage }>
			<IonHeader>
				<IonToolbar>
					
                    <IonButtons slot="start">
                        <IonBackButton icon={ arrowBack } text="" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={ shapesOutline } />
                        </IonButton>
                    </IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={ styles.headingText }>
                            <IonCardTitle>S'inscrire</IonCardTitle>
                            <h5>Faisons connaissance</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ createAccount }>Create account</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <Action message="Already got an account?" text="Login" link="/login" />

			</IonContent>

			<IonFooter>
				<IonGrid className="ion-no-margin ion-no-padding">

                    <Wave />
				</IonGrid>
			</IonFooter>
		</IonPage>
	);
};

export default Signup;