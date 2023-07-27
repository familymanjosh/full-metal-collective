import { create } from "zustand";

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:3000/api";

const useStore = create((set) => ({
  user: undefined,
  
  todos: [],
  fetchTodos: async () => {
    try {
      const response = await fetch(`${URL}/todos`);
      const todos = await response.json();
      set({ todos });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  },
  addTodo: async (todo) => {
    try {
      const response = await fetch(`${URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const createdTodo = await response.json();
      set((state) => ({ todos: [...state.todos, createdTodo] }));
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  },
  updateTodo: async (updatedTodo) => {
    try {
      const response = await fetch(`${URL}/todos/${updatedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const updatedItem = await response.json();
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedItem.id ? updatedItem : todo
        ),
      }));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  },
  deleteTodo: async (id) => {
    try {
      await fetch(`${URL}/todos/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },

  notes: [],
  fetchNotes: async () => {
    try {
      const response = await fetch(`${URL}/notes`);
      const notes = await response.json();
      set({ notes });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },
  addNote: async (note) => {
    try {
      const response = await fetch(`${URL}/notes`, {
        method: "POST",
        body: JSON.stringify(note),
      });

      const createdNote = await response.json();
      set((state) => ({ notes: [...state.notes, createdNote] }));
    } catch (error) {
      console.error("Error creating note:", error);
    }
  },

  deleteNote: async (id) => {
    try {
      await fetch(`${URL}/notes/${id}`, {
        method: "DELETE",
      });

      set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));

    } catch (error) {
      console.error("Error deleting note:", error);
    }

  },


  photos: [],
    fetchPhotos: async () => {
      try {
        const response = await fetch(`${URL}/photos`);
        const photos = await response.json();
        set({ photos });
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    },
  addPhoto: async (photo) => {
    try {
      const response = await fetch(`${URL}/photos`, {
        method: "POST",
        body: JSON.stringify(photo),
      });

      const createdPhoto = await response.json();
      set((state) => ({ photos: [...state.photos, createdPhoto] }));
    } catch (error) {
      console.error("Error creating photo:", error);
    }

  },
  updatePhoto: async (updatedPhoto) => {
    try {
      const response = await fetch(`${URL}/photos/${updatedPhoto.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPhoto),
      });
      const updatedItem = await response.json();
      set((state) => ({
        photos: state.photos.map((photo) =>
          photo.id === updatedItem.id ? updatedItem : photo
        ),
      }));
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  },
  deletePhoto: async (id) => {
    try {
      await fetch(`${URL}/photos/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        photos: state.photos.filter((photo) => photo.id !== id),
      
      }));
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  },
  
  invoices: [],

  fetchInvoices: async () => {
    try {
      const response = await fetch(`${URL}/invoices`);
      const invoices = await response.json();
      set({ invoices });
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  },
  addInvoice: async (invoice) => {
    try {
      const response = await fetch(`${URL}/invoices`, {
        method: "POST",
        body: JSON.stringify(invoice),
      });

      const createdInvoice = await response.json();
      set((state) => ({ invoices: [...state.invoices, createdInvoice] }));
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  },
  updateInvoice: async (updatedInvoice) => {
    try {
      const response = await fetch(`${URL}/invoices/${updatedInvoice.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInvoice),

      });
      const updatedItem = await response.json();

      set((state) => ({
        invoices: state.invoices.map((invoice) => invoice.id === updatedItem.id ? updatedItem : invoice),
      }));
    } catch (error) {
      console.error("Error updating invoice:", error);
    }

  },
  deleteInvoice: async (id) => {
    try {
      await fetch(`${URL}/invoices/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        invoices: state.invoices.filter((invoice) => invoice.id !== id),
      }));

    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  },
 isloggedin: false,
  login: async (user) => {
    try {
      const response = await fetch(`${URL}/login`, {
        method: "POST",
        body: JSON.stringify(user),
      });
      const loggedin = await response.json();
      set({ loggedin });
    }
    catch (error) {
      console.error("Error logging in:", error);
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${URL}/logout`, {
        method: "POST",
      });
      const loggedout = await response.json();
      set({ loggedout });
    }
    catch (error) {
      console.error("Error logging out:", error);
    }
  }
}));

export default useStore;