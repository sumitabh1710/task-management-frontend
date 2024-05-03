const BASE_URL = "http://127.0.0.1:8080";

const headers = {
  "Content-Type": "application/json",
};

const api = {
  getTasks: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getTaskById: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  addTask: async (url, body) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  editTask: async (url, body) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error editing patient:", error);
      throw error;
    }
  },

  deleteTask: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "DELETE",
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw error;
    }
  },
};

export default api;
