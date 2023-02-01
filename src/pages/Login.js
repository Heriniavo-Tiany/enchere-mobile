import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCardTitle,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRouterLink,
    IonRow,
    IonToolbar
} from '@ionic/react';
import styles from './Login.module.scss';

import {arrowBack, shapesOutline} from "ionicons/icons";
import CustomField from '../components/CustomField';
import {useLoginFields} from '../data/fields';
import {Action} from '../components/Action';
import {Wave} from '../components/Wave';
import {useEffect, useState} from 'react';
import {validateForm} from '../data/utils';
import {useHistory, useParams} from 'react-router';
import axios from "axios";

const Login = () => {
    const history = useHistory();

    const params = useParams();

    const fields = useLoginFields();
    const [errors, setErrors] = useState(false);

    const login = async () => {

        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length) {

            const params = {
                email: fields[0].input.state.value,
                mdp: fields[1].input.state.value,
            };

            try {
                const response = await axios.post(`https://wsenchere.up.railway.app/loginUtilisateurs`, {}, {params});
                if (response.status === 200) {
                    console.log(response.data);
                    const data = response.data;

                    if (response.data.code === 202) {
                        history.push(`/encheres`);
                    }
                    if (response.data.code === 404) {
                        history.push(`/login`);
                    }

                    if (response.data.length === 1) {
                        history.push(`/rencherir`);
                    } else {
                        history.push(`/login?e=0`);
                    }

                } else {
                    console.log("Loading");
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
        <IonPage className={styles.loginPage}>
            <IonHeader>
                <IonToolbar>

                    <IonButtons slot="start">
                        <IonBackButton icon={arrowBack} text="" className="custom-back"/>
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={shapesOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={styles.headingText}>
                            <IonCardTitle>Log in</IonCardTitle>
                            <h5>Bon retour, j'espère que vous allez bien</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            {fields.map(field => {

                                return <CustomField field={field} errors={errors}/>;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={login}>Login</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Pas encore de compte?" text="S'incrire" link="/signup"/>
                    <Wave/>
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Login;