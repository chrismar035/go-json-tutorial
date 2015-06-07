package main

import (
	"github.com/nu7hatch/gouuid"
)

var todos = make(map[string]Todo)

func init() {
	RepoCreateTodo(Todo{Name: "Write Presentation"})
	RepoCreateTodo(Todo{Name: "Host meetup"})
}

func RepoFindTodo(id string) Todo {
	return todos[id]
}

func RepoCreateTodo(t Todo) Todo {
	newId, err := uuid.NewV4()
	if err != nil {
		panic(err)
	}
	t.Id = newId.String()
	todos[t.Id] = t
	return t
}

func RepoDestroyTodo(id string) {
	delete(todos, id)
}

func RepoAllTodos() (loaded Todos) {
	for _, todo := range todos {
		loaded = append(loaded, todo)
	}
	return
}
