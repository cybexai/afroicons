# SYSIGAPE → Afroicons

Correspondance entre les icônes actuelles de SYSIGAPE (Material UI, Ant Design et icônes maison) et `afroicons-ui`. Les 59 concepts ont leur icône : 45 existaient déjà, 14 ont été dessinées pour SYSIGAPE.

```bash
npm install afroicons-ui lucide-react afroicons-react
```

```tsx
import { ShieldCheck, PiggyBank, Landmark } from "afroicons-ui"; // noms Lucide
import { DrapeauCameroun } from "afroicons-react";               // n° 60
```

Les deux visuels de marque restent à part :
- **n° 60, drapeau du Cameroun** (sélecteur de langue) : `<DrapeauCameroun />` d'`afroicons-react`, aux couleurs officielles.
- **n° 61, illustration « validé »** : c'est une illustration, pas une icône ; elle reste telle quelle.

| N° | Concept | Icône actuelle | `afroicons-ui` | Note |
| --- | --- | --- | --- | --- |
| 01 | Retour | ArrowLeftOutlined · ArrowBack · ArrowBackIosNewSharp | `ArrowLeft` |  |
| 02 | Suivant / voir plus | ArrowRightOutlined · East | `ArrowRight` |  |
| 03 | Séparateur de fil d'Ariane | NavigateNext | `ChevronRight` |  |
| 04 | Ouvrir une liste | KeyboardArrowDown · DropdownIcon | `ChevronDown` |  |
| 05 | Accueil | HomeOutlined | `Home` |  |
| 06 | Tableau de bord | WindowsOutlined | `LayoutDashboard` |  |
| 07 | Menu | Menu | `Menu` | nouvelle |
| 08 | Déplier le menu latéral | MenuUnfoldOutlined | `PanelLeftOpen` | nouvelle |
| 09 | Replier le menu latéral | MenuFoldOutlined | `PanelLeftClose` | nouvelle |
| 10 | Plus d'options | MoreOutlined · MoreVert | `MoreVertical` | nouvelle |
| 11 | Ajouter | PlusOutlined | `Plus` |  |
| 12 | Modifier | EditFilled · EditOutlined | `Pencil` |  |
| 13 | Supprimer / effacer | DeleteFilled | `Trash2` |  |
| 14 | Voir / afficher | EyeFilled · EyeOutlined · Visibility | `Eye` |  |
| 15 | Masquer | EyeInvisibleOutlined · VisibilityOff | `EyeOff` |  |
| 16 | Rechercher | SearchOutlined | `Search` |  |
| 17 | Fermer | Close | `X` |  |
| 18 | Télécharger | DownloadOutlined | `Download` |  |
| 19 | Téléverser | Upload | `Upload` |  |
| 20 | Joindre un fichier | FileOpen | `Paperclip` |  |
| 21 | Envoyer | Send | `Send` |  |
| 22 | Déconnexion | LogoutOutlined | `LogOut` |  |
| 23 | Paramètres | SettingOutlined · Settings | `Settings` |  |
| 24 | Aide / support | QuestionCircleOutlined | `HelpCircle` |  |
| 25 | Lire la vidéo | PlayArrowRounded | `Play` |  |
| 26 | Mode sombre | DarkModeOutlined | `Moon` |  |
| 27 | Mode clair | LightModeOutlined | `Sun` | nouvelle |
| 28 | Accordé / validé | TaskAltOutlined · CheckCircleOutline · DocIconGreen | `CheckCircle2` |  |
| 29 | En attente | PendingActionsOutlined · ClockList | `Hourglass` | nouvelle |
| 30 | Rejeté | HighlightOffOutlined · RedNotificationIcon | `XCircle` |  |
| 31 | Étude du dossier | FactCheckOutlined | `ClipboardCheck` |  |
| 32 | Durée | ScheduleOutlined | `Timer` |  |
| 33 | Horaires | AccessTimeOutlined | `Clock` |  |
| 34 | Aucun élément | ContentPasteOff | `ClipboardX` | nouvelle |
| 35 | Garantie de l'État | VerifiedUserOutlined · ShieldOutlined | `ShieldCheck` |  |
| 36 | Montant / crédit | PaymentsOutlined | `Banknote` |  |
| 37 | Montant accordé | AccountBalanceWalletOutlined | `Wallet` | cauri |
| 38 | Enveloppe / budget | SavingsOutlined | `PiggyBank` | nouvelle · tirelire en terre cuite |
| 39 | Commission / taux | PercentOutlined | `Percent` |  |
| 40 | Projet | ProjectOutlined · AssignmentOutlined | `FolderKanban` |  |
| 41 | Dossier | FolderFilled · Folder | `Folder` | nouvelle |
| 42 | Procédure | AccountTreeOutlined | `Workflow` |  |
| 43 | Secteur primaire | AgricultureOutlined | `Tractor` | nouvelle · la daba |
| 44 | Secteur secondaire | FactoryOutlined | `Factory` |  |
| 45 | Secteur tertiaire / commerce | StorefrontOutlined | `Store` | boutique de quartier |
| 46 | Établissement prêteur / banque | BankOutlined · AccountBalanceOutlined | `Landmark` |  |
| 47 | Entreprise | ShopOutlined · BusinessOutlined | `Building2` |  |
| 48 | Grande entreprise | ApartmentOutlined | `Building` | nouvelle |
| 49 | Utilisateur / profil | UserOutlined · PersonOutlineOutlined · ProfileFilled | `User` |  |
| 50 | Gestion des utilisateurs | ManageAccountsOutlined | `UserCog` | nouvelle |
| 51 | Document | DescriptionOutlined · ArticleOutlined · InsertDriveFile · DocIcon | `FileText` |  |
| 52 | Document PDF | PictureAsPdfOutlined | `FileText` |  |
| 53 | Requête / commentaire | WechatFilled · MapsUgc | `MessageSquare` |  |
| 54 | Notifications | Notifications | `Bell` |  |
| 55 | Citation | FormatQuote | `Quote` | nouvelle |
| 56 | Email | Email · MailOutline | `Mail` |  |
| 57 | Email envoyé | MarkEmailReadOutlined | `MailCheck` | nouvelle |
| 58 | Téléphone | Phone · CallOutlined | `Phone` |  |
| 59 | Adresse | PlaceOutlined | `MapPin` |  |
| 60 | Drapeau du Cameroun | CmrIcon | `DrapeauCameroun` (afroicons-react) | couleurs officielles |
| 61 | Illustration « validé » | TickIcon | — | illustration conservée |

Pour un même concept, SYSIGAPE utilisait parfois deux ou trois icônes (Ant Design dans le tableau de bord, Material UI ailleurs) : une seule icône `afroicons-ui` les remplace toutes, pour un rendu cohérent.
