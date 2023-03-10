import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonItemOption, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {useParams} from 'react-router';
import Upload from "./Upload";
import { addCircleSharp } from "ionicons/icons";


const NewEnchere: React.FC = () =>{
    const  iduser = sessionStorage.getItem("id");
    // const { iduser } = useParams<{ iduser: string; }>();
    const [dateheure, setDateheure ] = useState('')
    const history = useHistory();

    const [idutilisateur, setIdutilisateur] = useState('')
    const [idcategorie, setidcategorie] = useState('')
    const [idproduit, setidproduit] = useState('')
    
    const [date, setdate] = useState('')
    const [heure, setheure] = useState('')

    const [prix, setprix] = useState('')
    const [duree, setduree] = useState('')

    const [categories, setCat] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setDateheure(date + " " + heure);
    }, [date, heure]);


    useEffect(() => {
        axios(`https://wsenchere.up.railway.app/CategoriesEnchere`)
            .then((response) => {
                setCat(response.data);
                setError(null);
            })
            .catch(setError);

    }, []);

    

    const newEnchere = async () =>{
        const params = {
            idutilisateur: iduser,
            idcategorie: idcategorie,
            idproduit: idproduit,
            dateheure: dateheure,
            prix_minimal:prix,
            duree: duree
        };

        try {
            const response = await axios.post(`https://wsenchere.up.railway.app/NewEnchere`, {}, { params });
            if (response.status === 200) {
                console.log(response.data);
                history.push(`/liste`);
            }
        } catch (error) {
            
        }
    }

    function redirect(idcategorie:string){
        history.push('/produit/'+idcategorie);
    }

    return(
        <>
        <IonPage>
            <IonToolbar>
                <IonItem>
                    <IonTitle>Nouvelle Enchere</IonTitle>
                </IonItem>
            </IonToolbar>

            <IonContent>
                <IonItem>
                    <IonLabel>Categorie : </IonLabel>
                    <IonSelect name="categorie"  onIonChange={(e: any) => setidcategorie(e.target.value)}>
                        { categories.map(({
                                  idcategorie,
                                  nom
                              }) => (
                        <IonSelectOption value={idcategorie}>{nom}</IonSelectOption>
                        ))
                }
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel>Produit : </IonLabel>
                    <IonItem>
                        <IonIcon icon={addCircleSharp}  onClick={()=> redirect(idcategorie)} ></IonIcon>
                    </IonItem>
                </IonItem>

                <IonItem>
                    <IonLabel>Date et Heure : </IonLabel>
                    <IonInput type="date" name="date" clearInput={true} onIonChange={(e: any) => setdate(e.target.value)}></IonInput>
                    <IonInput type="time" name="heure" clearInput={true} onIonChange={(e: any) => setheure(e.target.value)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>Prix minimal :</IonLabel>
                    <IonInput type="text" name="prix" clearInput={true} onIonChange={(e: any) => setprix(e.target.value)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>Duree :</IonLabel>
                    <IonInput type="time" name="duree" clearInput={true} onIonChange={(e: any) => setduree(e.target.value)}></IonInput>
                </IonItem>

                <IonItem>
                    <Upload />
                </IonItem>   
  
                <IonButton className="btn-simple" color="primary" onClick={newEnchere}>Ok, Inserer</IonButton>

            </IonContent>
        </IonPage>
        </>
    );
};
export default NewEnchere;