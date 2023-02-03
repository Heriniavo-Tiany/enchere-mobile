import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Home',
    url: '/home',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Login',
    url: '/login',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Inscription',
    url: '/signup',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Liste',
    url: '/liste',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'New Enchere',
    url: '/new',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Recharger',
    url: '/recharger',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  }
];

const labels = ['Heriniavo Tiany', 'Maphie Sarobidy', ' Anja'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Enchere</IonListHeader>
          <IonNote>ETU 1679, 1509, 1479</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Groupe</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
