#!/bin/bash

# Script para criar os arquivos CSV iniciais
# Este script é executado automaticamente pelo backend, mas pode ser usado manualmente se necessário

echo "Criando diretório de dados..."
mkdir -p data

echo "Criando talhoes.csv..."
cat > data/talhoes.csv << 'EOF'
id,latitude,longitude,tipoSolo
1,-18.9186,-48.2772,Latossolo Vermelho
2,-18.9200,-48.2800,Argissolo Vermelho
3,-18.9150,-48.2750,Neossolo Quartzarênico
EOF

echo "Criando culturas.csv..."
cat > data/culturas.csv << 'EOF'
id,nome
1,Soja
2,Milho
3,Algodão
4,Feijão
5,Trigo
EOF

echo "Criando enso.csv..."
cat > data/enso.csv << 'EOF'
Season,La Niña,Neutral,El Niño
Ago-Out,30,68,2
Set-Nov,39,57,4
Out-Dez,44,49,7
Nov-Jan,42,50,8
Dez-Fev,38,52,10
Jan-Mar,32,58,10
Fev-Abr,24,66,10
Mar-Mai,17,73,10
Abr-Jun,13,71,16
EOF

echo "✅ Arquivos CSV criados com sucesso!"
echo ""
echo "Arquivos criados:"
echo "- data/talhoes.csv"
echo "- data/culturas.csv" 
echo "- data/enso.csv"
echo ""
echo "Estes arquivos serão utilizados pela aplicação para armazenar e carregar dados."