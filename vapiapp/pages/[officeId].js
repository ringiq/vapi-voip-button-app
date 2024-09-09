import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {useRealm} from '../context/RealmContext';
import {Assistant} from "../components/app/assistant";
import {Inter} from "next/font/google";
import Vapi from "@vapi-ai/web";

const inter = Inter({ subsets: ["latin"] });

const OfficePage = () => {
		const {realmApp, user, loading: realmLoading} = useRealm();

		const router = useRouter();
		const {officeId} = router.query;

		const [vapiConnection, setVapiConnection] = useState(null);  // State to store office data
		const [office, setOffice] = useState(null);  // State to store office data
		const [loading, setLoading] = useState(true);  // State to handle loading status
		const [error, setError] = useState(null);  // State to handle errors

		useEffect(() => {
				if (!realmApp) return;
				if (!user) return;
				if (!officeId) return;
				if (realmLoading) return;

				console.log(user);

				const fetchOffice = async () => {
					try {
						const client = realmApp.currentUser?.mongoClient('mongodb-atlas');

						const db = client.db(process.env.NEXT_PUBLIC_REALM_DB_NAME);
						const collection = db.collection('offices');
						const officeData = await collection.findOne({_id: officeId});

						if (officeData) {
							const vapi = new Vapi(officeData.vapiVoip?.token);

							setOffice(officeData);
							setVapiConnection(vapi);
						} else {
							console.error('Office not found');
						}
					} catch (error) {
						console.error('Error fetching office:', error);
					} finally {
						setLoading(false);
					}
				};

				fetchOffice();  // Call the function to fetch data
			}, [realmApp, user, officeId, realmLoading]
		);

		if (loading) {
			return <div>Loading...</div>;  // Display loading state
		}

		if (error) {
			return <div>Error: {error}</div>;  // Display error state
		}

		if (!office) {
			return <div>No office found</div>;  // Display if no office data is found
		}

		return (
			<main
				className={`flex min-h-screen flex-col items-center justify-center p-12 ${inter.className}`}
			>
				<Assistant
					error={error}
					loading={loading}
					office={office}
					vapi={vapiConnection}
				/>
			</main>
		);

	}
;

export default OfficePage;