import {
    IonButton,
    IonButtons,
    IonContent, IonFab, IonFabButton,
    IonHeader, IonIcon,
    IonItem,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {useParams} from 'react-router';
import './Page.css';
import {usePhotoGallery} from "./Photo2";
import {camera, closeCircleOutline} from "ionicons/icons";


const Upload: React.FC = () => {

    const {name} = useParams<{ name: string; }>();
    const {photos, takePhoto} = usePhotoGallery();

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        <IonTitle>{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">{name}</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonFab slot="fixed" vertical="bottom" horizontal="end">
                        <IonFabButton onClick={() => takePhoto(null)}>
                            <IonIcon icon={camera}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                    {
                        photos.length > 0 ?
                            <>
                                {
                                    photos.map((value: any, id: number) => {
                                        return (
                                            <>
                                                <p key={id}><IonButton onClick={() => takePhoto(id)}><IonIcon
                                                    icon={closeCircleOutline}> </IonIcon></IonButton><img
                                                    src={photos[id].webviewPath} alt="Img" width={100}></img></p>
                                            </>
                                        );
                                    })
                                }
                                {/*<IonButton onClick={insertPhoto.bind(this, info[0].idEnchere)}>Insérer</IonButton>*/}
                            </>


                            :
                            ''
                    }


                </IonContent>
            </IonPage>
        </>
    );
};

export default Upload;
