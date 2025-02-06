import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {Assistant} from "../components/app/assistant";
import {Inter} from "next/font/google";
import Vapi from "@vapi-ai/web";

const inter = Inter({subsets: ["latin"]});


const Home = () => {
		const router = useRouter();
		const {officeId} = router.query;

		const [vapiConnection, setVapiConnection] = useState(null);  // State to store office data
		const [office, setOffice] = useState(null);  // State to store office data
		const [loading, setLoading] = useState(true);  // State to handle loading status
		const [error, setError] = useState(null);  // State to handle errors

		useEffect(() => {
			if (!router.isReady) return; // make sure router is initialised

			// Redirect to Next.js 404 page if no officeId is provided
			if (!officeId) {
				router.replace('/404'); // Redirect to Next.js 404 page
				return;
			}

			// console.log(officeId);

			async function fetchOfficeToken() {
				try {
					setLoading(true);

					const response = await fetch(`/api/office/${officeId}`);

					if (!response.ok) {
						const errorMessage = response.headers.get("X-Error-Message") || `HTTP Error: ${response.status}`;
						setError(errorMessage);
						console.log(errorMessage);
						// throw new Error(errorMessage);
					} else {
						const officeData = await response.json();

						if (officeData) {
							const vapi = new Vapi(officeData?.token);

							setOffice(officeData);
							setVapiConnection(vapi);
						} else {
							setError("Vapi credentials not found");
						}
					}

				} catch (error) {
					console.error('Error fetching office:', error);
					setError(error);
				} finally {
					setLoading(false);
				}
			}

			fetchOfficeToken();

		}, [router.isReady, officeId]);

		if (loading) {
			return (
				<main className={`flex min-h-screen flex-col items-center justify-center p-12 ${inter.className}`}>
					Loading...
				</main>
			)
		}

		if (error) {
			return (
				<main className={`flex min-h-screen flex-col items-center justify-center p-12 ${inter.className}`}>
					Error: {error}
				</main>
			)
		}

		if (!office) {
			return (
				<main className={`flex min-h-screen flex-col items-center justify-center p-12 ${inter.className}`}>
					No office found
				</main>
			)
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

export default Home;