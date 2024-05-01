const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null || localStorage.getItem('token'),
			profile: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			login: async (user) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json",
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify(user), // body data type must match "Content-Type" header)
				})
				const data = await resp.json()
				if (resp.ok) {
					localStorage.setItem('token', data.access_token)
					setStore({ token: data.access_token })
					return true;
				}
				else return false;
			},
			register: async (user) => {
				// const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
				// 	method: "POST", // *GET, POST, PUT, DELETE, etc.
				// 	headers: {
				// 		"Content-Type": "application/json",
				// 		// 'Content-Type': 'application/x-www-form-urlencoded',
				// 	},
				// 	body: JSON.stringify(user), // body data type must match "Content-Type" header)
				// })
				// const data = await resp.json()
				// if (resp.ok) {
				// 	localStorage.setItem('token', data.access_token)
				// 	setStore({ token: data.access_token })
				// 	return true;
				// }
				// else return false;
				console.log(user);
			},
			getProfile: async (user) => {
				const store = getStore();
				const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				})
				const data = await resp.json()
				if (resp.ok) {
					setStore({ profile: data })
				}
			},
			logout: () => {
				setStore({ profile: null, token: null })
				localStorage.removeItem('token')
			}
		}
	};
};

export default getState;
