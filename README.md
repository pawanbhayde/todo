
# Next.js x Supabase: The Ultimate Web App Starter Kit

## Introduction to Next.js
Next.js is a React-based framework for building fast, scalable, and SEO-friendly web applications. It offers features like server-side rendering (SSR), static site generation (SSG), file-based routing, and API routes, making it ideal for modern web development.

## Differences between Next.js and React.
| NextJS  | ReactJS |
| ------------- |:-------------:|
| Framework built on top of React.      | Library built on top of Javascript.     |
| File-based routing system      | Requires libraries like React Router.     |
| SEO-friendly with server-side      | Limited SEO without SSR/SSG.     |
| Built-in API routes for backend      | Requires external backend APIs.     |
| Includes next/image for built-in image optimization.      | Requires third-party libraries.     |
| Optimized for platforms like Vercel      | Requires additional setup.    |

## Why choose Next.js?
🚀 Performance & Speed
🔍 SEO-Friendly
🛠 Full-Stack Capabilities
⚡ Flexible Rendering
🔄 Automatic Routing
☁ Easy Deployment
🔄 Built-in Features

## NextJS Folder Stucture
- public: Stores static assets like images, fonts, and favicons.
- src: Keeps all app-related code
- app: Server Components and Layouts for rendering.
- components: Reusable UI components
- hooks: Custom React hooks 
- lib: Utility functions, database config
- styles: Global styles (globals.css) and module styles (Button.module.css).
- utils: Helper functions
- context: React Context for global state management.
- services: API calls and external service integrations
- next.config.js: Next.js configuration settings.
- .env.local: Stores environment variables
- package.json: Project dependencies and scripts.
- .gitignore: Excludes unnecessary files from Git.

## Creating Page
A page is UI that is rendered on a specific route. To create a page, add a page file inside the app directory and default export a React component.
```
export default function Page() {  
return <h1>Hello Next.js!</h1>
}
```

## Creating Layout
A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.
```
export default function DashboardLayout({ children }) { 
return ( 
 <html lang="en"> 
   <body> 
     <main>{children}</main> 
   </body> 
 </html> 
)
}
```

## Creating Nested Pages
To create nested routes, you can nest folders inside each other. For example, to add a route for /blog, create a folder called blog in the app directory. Then, to make /blog publicly accessible, add a page file

## Creating NextJS Project
```
npx create-next-app@latest todo-app
```
```
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`? No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
```
```
code todo-app
```
```
npm run dev
```
## shadcn/ui
A set of beautifully-designed, accessible, and customizable components to help you build your component library. Open Source.

## shadcn/ui Installation
```
npx shadcn@latest init

Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes

npx shadcn@latest init -d
```

## Creating TODO APP
```
npx shadcn@latest add "https://v0.dev/chat/b/b_ayBk7xv1OsU"
```

## What is supabase?
Supabase is an open-source backend-as-a-service (BaaS) that provides a PostgreSQL database, authentication, real-time subscriptions, storage, and serverless functions—all with a Firebase-like experience. It helps developers build full-stack applications quickly without managing complex backend infrastructure.

## Key Features of Supabase
- PostgreSQL Database – Fully managed, scalable, and supports SQL queries.
- Authentication – Built-in user management with email, password, OAuth, and magic links.
- Real-time Database – Live updates using PostgreSQL's replication.
- Storage – Upload and manage files like images, videos, and documents.
- Edge Functions – Serverless functions for executing backend logic.

## Why Use Supabase?
- Open-source alternative to Firebase
- Works seamlessly with Next.js, React, Vue, and other frameworks
- No vendor lock-in since it’s built on PostgreSQL
- Easy setup and great developer experience

## Sign Up & Create a Project
- Go to Supabase Dashboard
- Click "New project" and fill in:
- Project Name
- Database Password (Save this securely)
- Select the region closest to your users.
- Click "Create new project" (Takes a few minutes to set up).
- Easy setup and great developer experience

## Creating .env.local
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Creating lib/supabase.js
```
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

## Creating supabase table
go to project and click on table editor then create new table
| Name  | Type | Default Value |
| ------------- |:-------------:|:-------------:|
| id      | uuid     | gen_random_uuid()     |
| created_at      | timestemp     | right bar     |
| text     | text     |      | 
 completed     | bool     | false     |

## import supabase client
```
import { supabase } from "@/lib/supabase";
```
```
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
```

## Adding Todo in supabase
```
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
  ```

## Updating Todo from supabase
```
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
  ```

  ## Removing Todo from supabase
  ```
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
  ```

## Removing Complete Todos from supabase
```
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

```
