# Para futuras alterações:

## 1. Na máquina local: 
```bash
editar
commit
push
```

## 2. Na VPS:
```bash
cd geodata
docker-compose down
git pull
docker-compose up --build -d
```