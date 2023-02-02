import {IonAvatar, IonButton, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from "@ionic/react";
import axios from "axios";
import {useHistory} from "react-router-dom";

interface ContainerProps {
    idenchere: any,
    idcategorieenchere: any,
    idutilisateur: any,
    idproduit: any,
    dateheure: any,
    prix_minimal: any,
    duree: any,
    prixFinal: any,
    idGagnant: any,
    produit: any
}


const Enchere: React.FC<ContainerProps> = ({
                                               idenchere,
                                               idcategorieenchere,
                                               idutilisateur,
                                               idproduit,
                                               dateheure,
                                               prix_minimal,
                                               duree,
                                               prixFinal,
                                               idGagnant,
                                               produit
                                           }) => {

    const history = useHistory();

    function btnOnClick(idproduit: any) {
        history.push(`/encheres/${idproduit}`);
    }

    return (
        <IonItemSliding key={idenchere}>
            <IonItem>
                <IonAvatar>
                    <img
                        src={produit.image[0]}
                        alt=""/>
                </IonAvatar>
                <IonLabel className="ion-padding">
                    <h2>{produit.description}</h2>
                    <p>Début: {dateheure}</p>
                    <p>Durée: {duree} mn</p>
                    <p>Prix Minimal: {prix_minimal}</p>
                    <IonButton onClick={() => btnOnClick(idproduit)}>Plus de détails</IonButton>
                </IonLabel>
            </IonItem>

        </IonItemSliding>
    );
};

export default Enchere;
