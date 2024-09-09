import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Realm from "realm-web";
import app from '../lib/realm';

const RealmContext = createContext(null);

export function RealmProvider({ children }) {
	const [realmApp, setRealmApp] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initializeRealm = async () => {
			setRealmApp(app);

			// Automatically log anonymous
			try {

				const credentials = Realm.Credentials.anonymous();

				const loggedInUser = await app.logIn(credentials);
				setUser(loggedInUser);

			} catch (error) {
				console.error('Authentication failed:', error);
			} finally {
				setLoading(false);
			}
		};

		initializeRealm();

	}, []);

	const logout = async () => {
		if (user) {
			await user.logOut();
			setUser(null);
		}
	};

	return (
		<RealmContext.Provider value={{ realmApp, user, loading, logout }}>
			{children}
		</RealmContext.Provider>
	);
}

export function useRealm() {
	const context = useContext(RealmContext);
	// console.log(context);
	// if (!context) {
	// 	throw new Error('useRealm must be used within a RealmProvider');
	// }
	return context;
}