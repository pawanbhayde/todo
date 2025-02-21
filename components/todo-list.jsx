"use client";
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Trash2, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase";

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [remainingTasks, setRemainingTasks] = useState(0)

  useEffect(() => {
    setRemainingTasks(todos.filter((todo) => !todo.completed).length);
  }, [todos]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching todos:", error.message);
    } else {
      setTodos(data);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ text: newTodo, completed: false }])
      .select()
      .single();

    if (error) {
      console.error("Error adding todo:", error.message);
    } else {
      setTodos([data, ...todos]);
      setNewTodo("");
    }
  };

  const toggleTodo = async (id, completed) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: !completed })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating todo:", error.message);
    } else {
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
    }
  };

  const removeTodo = async (id) => {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error.message);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

    const clearCompleted = async () => {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("completed", true);

      if (error) {
        console.error("Error clearing completed todos:", error.message);
      } else {
        setTodos(todos.filter((todo) => !todo.completed));
      }
    };

  return (
    (<Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="h-6 w-6" />
          My Todo List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTodo} className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow" />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
        <Separator className="my-4" />
        <ScrollArea className="h-[300px] pr-4">
          <AnimatePresence initial={false}>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}>
                <div className="flex items-center space-x-2 mb-2 bg-secondary p-2 rounded-md">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`} />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`flex-grow ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                    {todo.text}
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTodo(todo.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/20">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="secondary">
          {remainingTasks} task{remainingTasks !== 1 ? "s" : ""} remaining
        </Badge>
        <Button variant="outline" size="sm" onClick={clearCompleted}>
          Clear completed
        </Button>
      </CardFooter>
    </Card>)
  );
}

