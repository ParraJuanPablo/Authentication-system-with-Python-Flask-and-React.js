const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || null,
			user: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (email, password) => {
				console.log(email, password);
				const opts = {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify({
					email: email,
					password: password,
				  }),
				};
		
				try {
				  const response = await fetch(
					`${process.env.BACKEND_URL}/login`,
					opts
				  );
				  if (!response.ok) {
					console.log(response);
					return false;
				  }
				  const data = await response.json();
				  setStore({ token: data.token });
				  sessionStorage.setItem("token", data.token);
				  //getActions.read_variable_user();
				  return true;
				  console.log(data);
				} catch (error) {
				  console.log(error);
				  return false;
				}
			  },
			logout: () => {
			console.log("logout");
			sessionStorage.removeItem("token");
			setStore({ token: null });
			},
		
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			signup: async (data) => {
				console.log(data);
				const opts = {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify(data),
				};
		
				try {
				  const response = await fetch(
					`${process.env.BACKEND_URL}/user`,
					opts
				  );
		
				  if (!response.ok) {
					console.log(response);
					return false;
				  }
				  const data = await response.json();
				  console.log(data);
				  return true;
				} catch (error) {
				  console.log(error);
				  return false;
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
