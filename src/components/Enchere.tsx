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
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f2f2f2',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '2px 2px 5px gray'
            }}>
                <img
                    src={produit.image[0]}
                    alt=""
                    style={{width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px'}}
                />
                <h2 style={{margin: '0', color: 'black'}}>{produit.description}</h2>
                <p style={{margin: '10px 0', color: 'black'}}>Début: {dateheure}</p>
                <p style={{margin: '10px 0', color: 'black'}}>Durée: {duree} mn</p>
                <p style={{margin: '10px 0', color: 'black'}}>Prix Minimal: {prix_minimal}</p>
                <button style={{
                    backgroundColor: 'lightgray',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    color: 'black'
                }} onClick={() => btnOnClick(idproduit)}>
                    Plus de détails
                </button>
            </div>

            <br/>
        </>

    );
};

export default Enchere;
