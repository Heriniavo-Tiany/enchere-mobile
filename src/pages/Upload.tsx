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

            <IonButton onClick={() => takePhoto(null)}>
                <IonIcon icon={camera}></IonIcon>
            </IonButton>
            {
                photos.length > 0 ?
                    <>
                        {
                            photos.map((value: any, id: number) => {
                                console.log(photos);
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

        </>
    );
};

export default Upload;
