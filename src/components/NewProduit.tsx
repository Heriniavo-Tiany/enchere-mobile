import { IonButton, IonContent, IonIcon,IonTabButton, IonInput,IonHeader, IonItem, IonItemOption, IonLabel, IonModal, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import Upload from "../pages/Upload";

const NewProduit: React.FC = () => {
    const { idcategorie } = useParams<{ idcategorie: string; }>();
    const [nom, setnom] = useState('')
    const [description, setDescription] = useState('')
    const [idproduit, setidproduit] = useState('')
    const history = useHistory();
    
    const [categories, setCat] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios(`https://wsenchere.up.railway.app/CategoriesEnchere`)
            .then((response) => {
                setCat(response.data);
                setError(null);
            })
            .catch(setError);

    }, []);


    const newProduit = async () => {
        const params = {
            idproduit: idproduit,
            nom:nom,
            idcategorie: idcategorie,
            description : description
            
        };
        try {
            const response = await axios.post(`https://wsenchere.up.railway.app/produits`, {}, { params });
            if (response.status === 200) {
                console.log(response.data);
                history.push(`/new`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        
        <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Nouveau Produit</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                <IonItem>
                    <IonLabel>Id Produit :</IonLabel>
                    <IonInput type="text" name="idproduit" clearInput={true} onIonChange={(e: any) => setidproduit(e.target.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Nom :</IonLabel>
                    <IonInput type="text" name="nom" clearInput={true} onIonChange={(e: any) => setnom(e.target.value)}></IonInput>
                </IonItem>
               
                <IonItem>
                    <IonLabel>Description :</IonLabel>
                    <IonInput type="text" name="nom" clearInput={true} onIonChange={(e: any) => setDescription(e.target.value)}></IonInput>
                </IonItem>
                <Upload/>
                <IonButton onClick={newProduit}>ENTRER</IonButton>
                </IonContent>
                </IonPage>
        </>
    );
};
export default NewProduit;