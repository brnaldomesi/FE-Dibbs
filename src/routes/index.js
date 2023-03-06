import async from "../component/Async";

const Collection = async(() => import("../pages/collection/CollectionPage"));
const CollectionDetails = async(() => import("../pages/collection/CollectionDetailsPage"));
const AdminLogin = async(() => import("../pages/admin/AdminLoginPage"));
const AdminMintPage = async(() => import("../pages/admin/AdminMintPage"));
const CollectionMe = async(() => import("../pages/collection/CollectionMePage"));

const menuRoutes = [

	// Collection
	{
		path: '/',
		component: Collection,
		layout: 'cardMenu'
	},
	{
		path: '/collections',
		component: Collection,
		layout: 'cardMenu'
	},
	{
		path: '/collections/:collectID',
		component: CollectionDetails,
		layout: 'cardMenu'
	},
	{
		path: '/admin-login',
		component: AdminLogin,
		layout: 'cardMenu'
	},
	{
		path: '/admin-mint',
		component: AdminMintPage,
		layout: 'cardMenu'
	},
	{
		path: '/collection-me',
		component: CollectionMe,
		layout: 'battle'
	}
];

export {
	menuRoutes
};
