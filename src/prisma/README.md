## Docker Command Cheat Sheet

---

### `docker network ls`

**Purpose**
Lists all networks that Docker knows about on your system.

**When to Use**
Inspect which user-defined or built-in networks exist, their names, IDs, and drivers.

**Example Usage**

```bash
docker network ls
```

**Sample Output**

```plaintext
NETWORK ID     NAME               DRIVER    SCOPE
a1b2c3d4e5f6   bridge             bridge    local
1a2b3c4d5e6f   host               host      local
9f8e7d6c5b4a   none               null      local
0a1b2c3d4e5f   myproject_default  bridge    local
```

---

### `docker compose ps`

**Purpose**
Shows the containers that are part of your current Compose project, along with their status and port mappings.

**When to Use**
After running `docker compose up -d`, verify which services are running, their health, and bound ports.

**Example Usage**

```bash
docker compose ps
```

**Sample Output**

```plaintext
NAME                      COMMAND                  SERVICE   STATUS         PORTS
myproject_db_1            "docker-entrypoint.s…"   db        Up (healthy)   0.0.0.0:5432->5432/tcp
myproject_pgadmin_1       "/entrypoint.sh"         pgadmin   Up             0.0.0.0:8080->80/tcp
```

---

### `docker-compose down`

**Purpose**
Stops and removes all containers, networks, and (optionally) volumes created by `docker-compose up`.

**When to Use**
Tear down your entire Compose stack and clean up resources.

**Default Behavior**

* Removes containers and the default network
* Preserves named volumes (so data remains)

**Remove Volumes as Well**
Add `--volumes` to delete named volumes and their data:

```bash
docker-compose down --volumes
```

**Example Usage**

```bash
# Stop containers and remove the default network
docker-compose down

# Stop everything and also remove named volumes (data loss!)
docker-compose down --volumes
```

**Sample Output**

```plaintext
Stopping myproject_pgadmin_1 ... done
Stopping myproject_db_1      ... done
Removing myproject_pgadmin_1 ... done
Removing myproject_db_1      ... done
Removing network myproject_default
```

---

### `docker-compose up -d`

**Purpose**
Starts all services defined in your Docker Compose file in detached mode (running in the background).

**When to Use**
Bring up your entire Compose stack without tying up your terminal.

**Example Usage**

```bash
docker-compose up -d
```

**Sample Output**

```plaintext
Creating network myproject_default ... done
Creating volume myproject_db-data ... done
Creating myproject_db_1 ... done
Creating myproject_pgadmin_1 ... done
```

---

### `docker compose logs db`

**Purpose**
Tails the logs of the specified service (`db`) within your Compose project.

**When to Use**
Debug or monitor real-time output from your Postgres container.

**Example Usage**

```bash
docker compose logs db   # here db is the service name in docker-compose.yaml file
```

**Sample Output**

```plaintext
db_1  | PostgreSQL init process complete; ready for start up.
db_1  | 2025-05-12 10:00:00.123 UTC [1] LOG:  database system is ready to accept connections
```

---

### `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container>`

**Purpose**
Retrieves the internal IP address of a running container, using the Go template filter.

**When to Use**
When you need to connect to a container directly (e.g., from another container or debugging network issues).

**Example Usage**

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <key/id of the container from docker desktop>
```

**Sample Output**

```plaintext
172.18.0.2
```

*(This is the container’s IP on the Docker network.)*

### PRISMA
## 1. Push your schema directly (no migrations)

If you’re OK with _not_ having a history of migration SQL files, you can tell Prisma to take whatever is in your `schema.prisma` and mirror it into your database:

```bash
npx prisma db push
```

## 2. Push your schema directly (no migrations)

If you ever want a clean slate, you can drop and replay all migrations:

```bash
npx prisma migrate reset
```