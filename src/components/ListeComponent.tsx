import {
    IonIcon,
    IonItem,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonModal,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonThumbnail,
    IonFab,
    IonFabButton
} from '@ionic/react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { camera, closeCircleOutline } from 'ionicons/icons';
import Login from '../pages/Login';
import { ajoutPhoto, usePhotoGallery } from '../pages/Photo2';

const ListeComponent = ({ mesEncheres }: { mesEncheres: any }) => {
    const { photos, takePhoto } = usePhotoGallery();
    const [nullite, setNullite] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState<any | null>(null);
    const [photos1, setPhotos] = useState<any | null>(null);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(idEnchere: number) {
        console.log("idEnchere : " + idEnchere);
        axios.get("http://localhost:4444/infoEnchere/" + idEnchere + "/" + sessionStorage.getItem("TokenUtilisateur")).then((response) => {
            setInfo(response.data["infoEnchere"]);
            console.log(response.data["infoEnchere"]);
            if (info != null) {
                console.log(info[0].libelle);
            }
        });
        getAllPhoto(idEnchere);
        setIsOpen(true);
    }
    function getAllPhoto(idEnchere:number){
        axios.get("http://localhost:4444/getPhotoEnchere/" + idEnchere).then((response) => {
            console.log(response.data["photo"]);
            setPhotos(response.data["photo"]);
            if (photos1 != null) {
                console.log("null");
                console.log(photos1[0].photo);
            }
        });
    }

    useEffect(() => {
        if (mesEncheres === null) {
            console.log("Null e!");
            setNullite(1);
        }
        if (mesEncheres != null) {
            //console.log("OK : " + mesEncheres[0].libelle);
            setNullite(2);
        }
    })
    function insertPhoto(id: any) {
        console.log(JSON.stringify(photos));
        axios.post("http://localhost:4444/insertPhoto/" + id + "/" + sessionStorage.getItem("TokenUtilisateur"), photos).then((res) => {
            console.log(res);
            takePhoto(-3);
        });
        setIsOpen(false);
        openModal(id);
    }

    return (
        <>
            {sessionStorage.getItem("TokenUtilisateur") != null ?
                <div>
                    {
                        mesEncheres?.map((value1: string, j: number) => {
                            return (
                                <div key={j}>
                                    <IonCard color="warning">
                                        <IonCardHeader>
                                            <IonCardTitle><b>{mesEncheres[j].libelle}</b></IonCardTitle>
                                            <IonCardSubtitle><b>Produit :</b>{mesEncheres[j].produitEnchere},{mesEncheres[j].categorie}</IonCardSubtitle>
                                        </IonCardHeader>

                                        <IonCardContent>
                                            <IonCardSubtitle><b>Date d??but :</b>{mesEncheres[j].dateHeure}</IonCardSubtitle>
                                            <IonCardSubtitle><b>Date fin :</b>{mesEncheres[j].dateFin}</IonCardSubtitle>
                                            <IonButton color="secondary" onClick={() => openModal(mesEncheres[j].idEnchere)}>D??tails</IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                            )
                        })}
                </div>
                : <Login />
            }

            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>D??tail</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={closeModal}>
                                <IonIcon icon={closeCircleOutline}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {
                        info != null ?
                            <IonCard>
                                <IonItem>
                                    {photos1?.map((value1: string, j: number) => {
                                        return (
                                            <div key={j}>
                                                {j === 0 ?
                                                    <img src={photos1[j]["photo"]} alt="zety" />
                                                    :

                                                    <IonThumbnail slot="start">
                                                        <img src={photos1[j]["photo"]} alt="zety" />
                                                    </IonThumbnail>

                                                }
                                            </div>
                                        )
                                    })}
                                </IonItem>
                                <IonCardHeader>
                                    <IonItem>
                                        <IonFab slot="start" vertical="center" horizontal="end">
                                            <IonFabButton onClick={() => takePhoto(null)}>
                                                <IonIcon icon={camera}></IonIcon>
                                            </IonFabButton>
                                        </IonFab>
                                    </IonItem>
                                    {
                                        photos.length > 0 ?
                                            <>
                                                {
                                                    photos.map((value: any, id: number) => {
                                                        return (
                                                            <>
                                                                <p key={id}><IonButton onClick={() => takePhoto(id)}><IonIcon icon={closeCircleOutline}> </IonIcon></IonButton><img src={photos[id].webviewPath} alt="Img" width={100}></img></p>
                                                            </>
                                                        );
                                                    })
                                                }
                                                <IonButton onClick={insertPhoto.bind(this, info[0].idEnchere)}>Ins??rer</IonButton>
                                            </>


                                            :
                                            ''
                                    }
                                </IonCardHeader>

                            </IonCard>
                            : ''
                    }
                </IonContent>
            </IonModal>

        </>
    );
};

export default ListeComponent;
