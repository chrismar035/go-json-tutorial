package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome!")
}

func TodoIndex(w http.ResponseWriter, r *http.Request) {
	var loaded Todos
	for _, todo := range todos {
		loaded = append(loaded, todo)
	}

	w.Header().Set("Content-Type", "application/json;cahrset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(loaded); err != nil {
		panic(err)
	}
}

func TodoShow(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	todoId := vars["todoId"]
	todo := RepoFindTodo(todoId)
	w.Header().Set("Content-Type", "application/json;cahrset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(todo); err != nil {
		panic(err)
	}
}
