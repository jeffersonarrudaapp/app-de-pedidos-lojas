import React, { useEffect, useMemo, useState } from "react";
import {
  Store,
  Building2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Search,
  ShoppingCart,
  Filter,
  Database,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import "./App.css";

const lojas = [
  "Matriz",
  "Dumont",
  "Sumaré",
  "Gugão Pvai",
  "Gugão Nova L.",
  "Gugão Alto",
  "São Jorge",
];

const produtos = [
  { id: 1, cod_forn: 587664, fornecedor: "NUTRIBREADS", cod_produto: 23911, nome: "PÃO FRANÇES CONGELADO", unidade: "KG", embalagem: "10KG" },
  { id: 2, cod_forn: 587664, fornecedor: "NUTRIBREADS", cod_produto: 23634, nome: "PÃO BAGUETE", unidade: "KG", embalagem: "10KG" },
  { id: 3, cod_forn: 587664, fornecedor: "NUTRIBREADS", cod_produto: 23633, nome: "PÃO CURITIBANO", unidade: "KG", embalagem: "10KG" },

  { id: 4, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 10267, nome: "MINI SALGADO OYSHI FRITO KG BOLINHA DE QUEIJO (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 5, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 10264, nome: "MINI SALGADO OYSHI FRITO KG BOLINHO DE CARNE SECA (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 6, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 15153, nome: "MINI SALGADO OYSHI FRITO KG CHURROS DDL KG (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 7, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 10265, nome: "MINI SALGADO OYSHI FRITO KG COXINHA DE CARNE (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 8, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 10477, nome: "MINI SALGADO OYSHI FRITO KG COXINHA DE COSTELA (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 9, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 10266, nome: "MINI SALGADO OYSHI FRITO KG COXINHA DE FRANGO (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 10, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 10268, nome: "MINI SALGADO OYSHI FRITO KG KIBE REQUEIJAO (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 11, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 10271, nome: "MINI SALGADO OYSHI FRITO KG RISOLES DE CARNE (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 12, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 10273, nome: "MINI SALGADO OYSHI FRITO KG RISOLES DE PIZZA (PADARIA)", unidade: "KG", embalagem: "4kg" },
  { id: 13, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 42665, nome: "PAO DE QUEIJO OYSHI CONGELADO KG PADARIA", unidade: "KG", embalagem: "4kg" },
  { id: 14, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 25059, nome: "PAO DE QUEIJO OYSHI RECHEADO KG FRANGO", unidade: "KG", embalagem: "4kg" },
  { id: 16, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 279862, nome: "SALGADO GRANDE OYSHI FRITO KG COXINHA DE CARNE", unidade: "KG", embalagem: "4kg" },
  { id: 17, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 536415, nome: "SALGADO GRANDE OYSHI FRITO KG COXINHA DE FRANGO", unidade: "KG", embalagem: "4kg" },
  { id: 18, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 301230, nome: "SALGADO GRANDE OYSHI FRITO KG KIBE RECHEADO", unidade: "KG", embalagem: "4kg" },
  { id: 19, cod_forn: 633712, fornecedor: "OYSHI", cod_produto: 436330, nome: "SALGADO GRANDE OYSHI FRITO KG RISOLES DE CARNE", unidade: "KG", embalagem: "4kg" },

  { id: 20, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55468, nome: "PAO VILLEMAN FRANCES KG", unidade: "KG", embalagem: "10kg" },
  { id: 21, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55469, nome: "PAO VILLEMAN CURITIBANO KG", unidade: "KG", embalagem: "10kg" },
  { id: 22, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55470, nome: "PAO VILLEMAN CASEIRO KG", unidade: "KG", embalagem: "7,5kg" },
  { id: 23, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55471, nome: "PAO VILLEMAN BAGUETE TRADICIONAL KG", unidade: "KG", embalagem: "10kg" },
  { id: 24, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55472, nome: "PAO VILLEMAN BENGALA KG", unidade: "KG", embalagem: "5kg" },
  { id: 25, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55473, nome: "PAO VILLEMAN BISNAGUINHA KG", unidade: "KG", embalagem: "5kg" },
  { id: 26, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55474, nome: "PAO VILLEMAN CASEIRAO KG", unidade: "KG", embalagem: "7,5kg" },
  { id: 27, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55475, nome: "PAO VILLEMAN CASEIRINHO KG", unidade: "KG", embalagem: "5kg" },
  { id: 28, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55476, nome: "PAO VILLEMAN DOCE KG", unidade: "KG", embalagem: "5kg" },
  { id: 29, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55477, nome: "PAO VILLEMAN HAMBURGUER KG", unidade: "KG", embalagem: "5kg" },
  { id: 30, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55478, nome: "PAO VILLEMAN HOT DOG KG", unidade: "KG", embalagem: "5kg" },
  { id: 31, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55479, nome: "PAO VILLEMAN INTEGRAL KG", unidade: "KG", embalagem: "5kg" },
  { id: 32, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55480, nome: "PAO VILLEMAN MELAO KG", unidade: "KG", embalagem: "7,5kg" },
  { id: 33, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55481, nome: "PAO VILLEMAN MILHO KG", unidade: "KG", embalagem: "7,5kg" },
  { id: 34, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55482, nome: "PAO VILLEMAN FRANCES MINI KG", unidade: "KG", embalagem: "10kg" },
  { id: 35, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55483, nome: "PAO VILLEMAN HOT DOG MINI KG", unidade: "KG", embalagem: "5kg" },
  { id: 36, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55484, nome: "PAO VILLEMAN INTEGRAL MINI KG", unidade: "KG", embalagem: "5kg" },
  { id: 37, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55485, nome: "PAO VILLEMAN MILHO MINI KG", unidade: "KG", embalagem: "5kg" },
  { id: 38, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55486, nome: "PAO VILLEMAN TRANCA KG", unidade: "KG", embalagem: "7,5kg" },
  { id: 39, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55487, nome: "PAO VILLEMAN BRIOCHE KG", unidade: "KG", embalagem: "5kg" },
  { id: 40, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55488, nome: "ROSQUINHA VILLEMAN PINGA KG", unidade: "KG", embalagem: "2kg" },
  { id: 41, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 53210, nome: "CUECA VIRADA VILLEMAN KG", unidade: "KG", embalagem: "2kg" },
  { id: 42, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55489, nome: "DONUTS VILLEMAN KG", unidade: "KG", embalagem: "2kg" },
  { id: 43, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55490, nome: "SONHO VILLEMAN KG", unidade: "KG", embalagem: "5kg" },
  { id: 44, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55492, nome: "EMPADA VILLEMAN KG CALABRESA KG", unidade: "KG", embalagem: "1,3kg" },
  { id: 45, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55493, nome: "EMPADA VILLEMAN KG PALMITO KG", unidade: "KG", embalagem: "1,3kg" },
  { id: 46, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55494, nome: "EMPADA VILLEMAN KG FRANGO KG", unidade: "KG", embalagem: "1,3kg" },
  { id: 47, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55495, nome: "EMPADA VILLEMAN KG BROCOLIS C/ BACON KG", unidade: "KG", embalagem: "1,3kg" },
  { id: 48, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55497, nome: "MINI SALGADO VILLEMAN KG FRANGO C/ REQUEIJAO KG", unidade: "KG", embalagem: "2kg" },
  { id: 49, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55498, nome: "MINI SALGADO VILLEMAN KG CROISSANT FRANGO KG", unidade: "KG", embalagem: "2kg" },
  { id: 50, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55499, nome: "MINI SALGADO VILLEMAN KG CROISSANT PRESUNTO E QUEIJO KG", unidade: "KG", embalagem: "2kg" },
  { id: 51, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55500, nome: "MINI SALGADO VILLEMAN KG ESFIRRA DE CARNE KG", unidade: "KG", embalagem: "2kg" },
  { id: 52, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55501, nome: "MINI SALGADO VILLEMAN KG ESFIRRA DE FRANGO KG", unidade: "KG", embalagem: "2kg" },
  { id: 53, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55502, nome: "MINI SALGADO VILLEMAN KG PRESUNTO E QUEIJO KG", unidade: "KG", embalagem: "2kg" },
  { id: 54, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55503, nome: "MINI SALGADO VILLEMAN KG SALSICHA KG", unidade: "KG", embalagem: "2kg" },
  { id: 55, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55505, nome: "SALGADO GRANDE VILLEMAN KG BAGUETE CALABRESA KG", unidade: "KG", embalagem: "2,7kg" },
  { id: 56, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55506, nome: "SALGADO GRANDE VILLEMAN KG BAGUETE FRANGO KG", unidade: "KG", embalagem: "2,7kg" },
  { id: 57, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55507, nome: "SALGADO GRANDE VILLEMAN KG BAGUETE PRESUNTO/QUEIJO KG", unidade: "KG", embalagem: "2,7kg" },
  { id: 58, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55508, nome: "SALGADO GRANDE VILLEMAN KG HAMBURGUER DE PIZZA KG", unidade: "KG", embalagem: "2,63kg" },
  { id: 59, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55509, nome: "SALGADO GRANDE VILLEMAN KG HAMBURGUER CHEEDAR KG", unidade: "KG", embalagem: "2,63kg" },
  { id: 60, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55510, nome: "SALGADO GRANDE VILLEMAN KG HAMBUERGUER BACON KG", unidade: "KG", embalagem: "2,63kg" },
  { id: 61, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55511, nome: "SALGADO GRANDE VILLEMAN KG HOT DOG PRESUNTO/QUEIJO CREMOSO KG", unidade: "KG", embalagem: "3,150kg" },
  { id: 62, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55512, nome: "SALGADO GRANDE VILLEMAN KG PASTELAO DE FRANGO KG", unidade: "KG", embalagem: "2,175kg" },
  { id: 63, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55513, nome: "SALGADO GRANDE VILLEMAN KG ESFIRRA CARNE KG", unidade: "KG", embalagem: "2,025kg" },
  { id: 64, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55522, nome: "SALGADO GRANDE VILLEMAN KG ESFIRRA FRANGO KG", unidade: "KG", embalagem: "2,025kg" },
  { id: 65, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55523, nome: "SALGADO GRANDE VILLEMAN KG TROUXINHA DE CARNE C/ BACON KG", unidade: "KG", embalagem: "2,175kg" },
  { id: 66, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55524, nome: "SALGADO GRANDE VILLEMAN KG BAURU KG", unidade: "KG", embalagem: "2,325kg" },
  { id: 67, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55525, nome: "SALGADO GRANDE VILLEMAN KG CROISSANT SEM RECHEIO KG", unidade: "KG", embalagem: "2,175kg" },
  { id: 68, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55526, nome: "SALGADO GRANDE VILLEMAN KG CROISSANT CALABRESA KG", unidade: "KG", embalagem: "2,175kg" },
  { id: 69, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55527, nome: "SALGADO GRANDE VILLEMAN KG CROISSANT PRESUNTO/QUEIJO KG", unidade: "KG", embalagem: "2,175kg" },
  { id: 70, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55528, nome: "SALGADO GRANDE GRANDE VILLEMAN KG CROISSANT FANGO KG", unidade: "KG", embalagem: "2,175kg" },
  { id: 71, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55530, nome: "SALGADO GRANDE VILLEMAN KG SEMI FOLHADO FRANGO C/ REQUEIJAO KG", unidade: "KG", embalagem: "2,175kg" },
  { id: 72, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55531, nome: "SALGADO GRANDE VILLEMAN KG SEMI FOLHADO PALMITO KG", unidade: "KG", embalagem: "2,175kg" },
  { id: 73, cod_forn: 49524, fornecedor: "VILLEMAN", cod_produto: 55532, nome: "SALGADO GRANDE VILLEMAN KG SEMI FOLHADO FRANGO C/CHEDDAR KG", unidade: "KG", embalagem: "2,175kg" },

  { id: 74, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 38551, nome: "ACUCAR GELADO MAVALERIO 1KG", unidade: "und", embalagem: "10 und" },
  { id: 75, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 10442, nome: "ANTIMOFO ITAIQUARA 1 KG", unidade: "und", embalagem: "12 und" },
  { id: 76, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 13714, nome: "CALDA P/PUDIM ITAIQUARA 5KG CARAMELO", unidade: "und", embalagem: "4 und" },
  { id: 77, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 51352, nome: "CEREAL MAVALERIO 500G CHOCO POWER BALL CHOC PRET/BRANC MICRO", unidade: "und", embalagem: "10 und" },
  { id: 78, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 497649, nome: "CEREJA EM CALDA MARRASQUINO CURICO 1 65KG C/CAROCO", unidade: "und", embalagem: "6 und" },
  { id: 79, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 273449, nome: "COCO RALADO COCONUT 10KG FINO", unidade: "und", embalagem: "1 und" },
  { id: 80, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 497517, nome: "COCO RALADO SOCOCO 5KG EM FLOCOS", unidade: "und", embalagem: "1 und" },
  { id: 81, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 41562, nome: "CORANTE SOFT GEL 60G AMARELO GEMA", unidade: "und", embalagem: "6 und" },
  { id: 82, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 43888, nome: "CORANTE SOFT GEL 60G AZUL JEANS", unidade: "und", embalagem: "6 und" },
  { id: 83, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 24793, nome: "CORANTE SOFT GEL 60G AZUL MARINHO", unidade: "und", embalagem: "6 und" },
  { id: 84, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 43883, nome: "CORANTE SOFT GEL 60G LARANJA MAGO", unidade: "und", embalagem: "6 und" },
  { id: 85, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 43882, nome: "CORANTE SOFT GEL 60G LILAS", unidade: "und", embalagem: "6 und" },
  { id: 86, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 43887, nome: "CORANTE SOFT GEL 60G PINK", unidade: "und", embalagem: "6 und" },
  { id: 87, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 43885, nome: "CORANTE SOFT GEL 60G PRETO MAGO", unidade: "und", embalagem: "6 und" },
  { id: 88, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 43880, nome: "CORANTE SOFT GEL 60G ROSA CHICLETE MAGO", unidade: "und", embalagem: "6 und" },
  { id: 89, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 626813, nome: "CORANTE SOFT GEL 60G VERDE FOLHA", unidade: "und", embalagem: "6 und" },
  { id: 90, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 43884, nome: "CORANTE SOFT GEL 60G VERMELHO NATAL", unidade: "und", embalagem: "6 und" },
  { id: 91, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 48480, nome: "CORANTE SOFTGEL BRANCO LEITE 25 GR", unidade: "und", embalagem: "6 und" },
  { id: 92, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 497371, nome: "CREME CONFEITEIRO ITAIQUARA 1KG", unidade: "und", embalagem: "10 und" },
  { id: 93, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 36899, nome: "EMULSIFICANTE MARVIGEL 10KG PLUS", unidade: "und", embalagem: "1 und" },
  { id: 94, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 21613, nome: "ESSENCIA DE BAUNILHA AROMAX 960ML", unidade: "und", embalagem: "1 und" },
  { id: 95, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 21172, nome: "ESSENCIA P PANETONE AROMA MIX 960ML", unidade: "und", embalagem: "1 und" },
  { id: 96, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 497479, nome: "FERMENTO EM PO ITAIQUARA 2KG QUIMICO", unidade: "und", embalagem: "12 und" },
  { id: 97, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 497614, nome: "FERMENTO FRESCO ITAQUARA KG", unidade: "KG", embalagem: "25 kg" },
  { id: 98, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 512001, nome: "MARG RICCA ESPECIAL 2KG FOLHADOS", unidade: "und", embalagem: "10 und" },
  { id: 99, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 497657, nome: "MARG RICCA ESPECIAL 2KG MASSAS E BOLOS", unidade: "und", embalagem: "10 und" },
  { id: 100, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 37164, nome: "MASSA FOLHADA ROLO 2KG", unidade: "und", embalagem: "10 und" },
  { id: 101, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 295809, nome: "MELHORITA ITAIQUARA 20KG", unidade: "und", embalagem: "1 und" },
  { id: 102, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 439304, nome: "MIST P/PANETONE ITAIQUARA 20KG", unidade: "und", embalagem: "1 und" },
  { id: 103, cod_forn: 63115, fornecedor: "ITAIQUARA", cod_produto: 441945, nome: "MISTURA ITAFLEX 2KG", unidade: "und", embalagem: "6 und" },

  { id: 104, cod_forn: 1000354, fornecedor: "PENIEL", cod_produto: 55607, nome: "CREME CULINARIO RICHS 1KG", unidade: "und", embalagem: "12 und" },
  { id: 105, cod_forn: 1000354, fornecedor: "PENIEL", cod_produto: 14150, nome: "CHANTILY FLAVOR RIGHT BAUNILHA 907G", unidade: "und", embalagem: "12 und" },
  { id: 106, cod_forn: 1000354, fornecedor: "PENIEL", cod_produto: 58433, nome: "CHANTILY FLAVOR RIGHT CHOCOLATE 907G", unidade: "und", embalagem: "12 und" },
  { id: 107, cod_forn: 1000354, fornecedor: "PENIEL", cod_produto: 35922, nome: "MIST P BOMBA ECLAIR IREKS 600G", unidade: "und", embalagem: "10 und" },

  { id: 108, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 548707, nome: "DESMOLDANTE EMULZINT CARLEX 600ML SPRAY", unidade: "und", embalagem: "6 und" },
  { id: 109, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 14036, nome: "MIST P BROWNIE EMULZINT 10KG", unidade: "und", embalagem: "1 und" },
  { id: 110, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 14660, nome: "MIST P BRIOCHE EMULZINT 10KG", unidade: "und", embalagem: "1 und" },
  { id: 111, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 14039, nome: "MIST P PAO TRIGALE EMULZINT 10KG INTEGRAL", unidade: "und", embalagem: "1 und" },
  { id: 112, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 12152, nome: "MIST P/CHIPPA EMULZINT 10KG", unidade: "und", embalagem: "1 und" },
  { id: 113, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 12625, nome: "MIST P/PAO DE BATATA EMULZINT 10KG", unidade: "und", embalagem: "1 und" },
  { id: 114, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 45327, nome: "MIST P/PAO EMULZINT 10KG ITALIANO", unidade: "und", embalagem: "1 und" },
  { id: 115, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 45322, nome: "MIST P/PAO EMULZINT 10KG MULTIGRAOS", unidade: "und", embalagem: "1 und" },
  { id: 116, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 45328, nome: "MIST P/PAO EMULZINT 10KG SEMI ITALIANO", unidade: "und", embalagem: "1 und" },
  { id: 117, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 12624, nome: "MIST P/PAO TIPO AUSTRALIANO EMULZINT 10KG", unidade: "und", embalagem: "1 und" },
  { id: 118, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 12628, nome: "MIST P/SONHO EMULZINT 10KG", unidade: "und", embalagem: "1 und" },
  { id: 119, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 16394, nome: "RECHEIO EMULZINT 1 05KG FRUTAS VERMELHAS", unidade: "und", embalagem: "5 und" },
  { id: 120, cod_forn: 2172, fornecedor: "EMULZINT", cod_produto: 12627, nome: "RECHEIO GOIABA EMULZINT 1,025KG", unidade: "und", embalagem: "5 und" },

  { id: 121, cod_forn: 2676, fornecedor: "PENNACCHI", cod_produto: 51723, nome: "CHOC EM PO HARALD 1,010KG MELKEN 50% CACAU", unidade: "und", embalagem: "10 und" },
  { id: 122, cod_forn: 2676, fornecedor: "PENNACCHI", cod_produto: 618381, nome: "CHOC GRANULADO HARALD 1KG MACIO", unidade: "und", embalagem: "10 und" },
  { id: 123, cod_forn: 2676, fornecedor: "PENNACCHI", cod_produto: 607770, nome: "COB BARRA HARALD CONFEITEIRO 1 010KG BRANCO", unidade: "und", embalagem: "10 und" },
  { id: 124, cod_forn: 2676, fornecedor: "PENNACCHI", cod_produto: 607797, nome: "COB BARRA HARALD CONFEITEIRO 1 010KG MEIO AMARGO", unidade: "und", embalagem: "10 und" },
  { id: 125, cod_forn: 2676, fornecedor: "PENNACCHI", cod_produto: 607789, nome: "COB BARRA HARALD CONFEITEIRO 1,010KG AO LEITE", unidade: "und", embalagem: "10 und" },
  { id: 126, cod_forn: 2676, fornecedor: "PENNACCHI", cod_produto: 618217, nome: "GANACHE MELKEN 4KG BRANCO", unidade: "und", embalagem: "4 und" },
  { id: 127, cod_forn: 2676, fornecedor: "PENNACCHI", cod_produto: 618373, nome: "GANACHE MELKEN 4KG CHOCOLATE AO LEITE", unidade: "und", embalagem: "4 und" },
  { id: 128, cod_forn: 2676, fornecedor: "PENNACCHI", cod_produto: 618209, nome: "GANACHE MELKEN 4KG MEIO AMARGO", unidade: "und", embalagem: "4 und" },

  { id: 129, cod_forn: 2882, fornecedor: "COAMO", cod_produto: 44217, nome: "GORDURA COAMO 14,5KG FRY 400", unidade: "und", embalagem: "1 und" },
  { id: 130, cod_forn: 2882, fornecedor: "COAMO", cod_produto: 273317, nome: "MARG COAMO BALDE 14,5KG S SAL PRODUCAO 80%", unidade: "und", embalagem: "1 und" },

  { id: 131, cod_forn: 613932, fornecedor: "ARAPONGAS", cod_produto: 12895, nome: "FARINHA DE TRIGO ARAPONGAS COMUM 25KG", unidade: "und", embalagem: "1 und" },
  { id: 132, cod_forn: 613932, fornecedor: "ARAPONGAS", cod_produto: 605344, nome: "MISTURA P/ PÃO FRANCES ARAPONGAS 25KG", unidade: "und", embalagem: "1 und" },

  { id: 133, cod_forn: 2844, fornecedor: "PIRACANJUBA", cod_produto: 641510, nome: "LEITE COND PIRACANJUBA 5KG", unidade: "und", embalagem: "4 und" },
  { id: 134, cod_forn: 56102, fornecedor: "TIROL", cod_produto: 51523, nome: "LEITE EM PO TIROL INTEGRAL 25KG", unidade: "und", embalagem: "5 und" },

  { id: 135, cod_forn: 51335, fornecedor: "NESTLE", cod_produto: 316849, nome: "COB BARRA NESTLE 1KG AO LEITE", unidade: "und", embalagem: "12 und" },
  { id: 136, cod_forn: 51335, fornecedor: "NESTLE", cod_produto: 605670, nome: "COB BARRA NESTLE 1KG BLEND", unidade: "und", embalagem: "12 und" },
  { id: 137, cod_forn: 51335, fornecedor: "NESTLE", cod_produto: 534900, nome: "COB BARRA NESTLE 1KG BRANCO MARFIM", unidade: "und", embalagem: "12 und" },
  { id: 138, cod_forn: 51335, fornecedor: "NESTLE", cod_produto: 613070, nome: "COB BARRA NESTLE 1KG MEIO AMARGO", unidade: "und", embalagem: "12 und" },

  { id: 139, cod_forn: 10019, fornecedor: "AMIFEC", cod_produto: 63138, nome: "AMIDO DE MILHO AMIFEC 25KG", unidade: "und", embalagem: "1 und" },
  { id: 140, cod_forn: 10019, fornecedor: "AMIFEC", cod_produto: 62195, nome: "FECULA DE MANDIOCA AMIFEC 25KG", unidade: "und", embalagem: "1 und" },
  { id: 141, cod_forn: 10019, fornecedor: "AMIFEC", cod_produto: 62196, nome: "POLVILHO AZEDO AMIFEC 25KG", unidade: "und", embalagem: "1 und" },
  { id: 142, cod_forn: 10019, fornecedor: "AMIFEC", cod_produto: 64264, nome: "POLVILHO DOCE AMIFEC 25KG", unidade: "und", embalagem: "1 und" },

  { id: 143, cod_forn: 1781, fornecedor: "FRIMESA", cod_produto: 497487, nome: "DOCE DE LEITE FRIMESA 4,8KG TRADICIONAL", unidade: "und", embalagem: "4 und" },

  { id: 144, cod_forn: 2744, fornecedor: "VABENE /POLPA NORTE", cod_produto: 48838, nome: "CEREAL MINI VABENE 500G COB BRANCO", unidade: "und", embalagem: "10 und" },
  { id: 145, cod_forn: 2744, fornecedor: "VABENE /POLPA NORTE", cod_produto: 48839, nome: "CEREAL MINI VABENE 500G COB MISTO", unidade: "und", embalagem: "10 und" },
  { id: 146, cod_forn: 2744, fornecedor: "VABENE /POLPA NORTE", cod_produto: 35926, nome: "CREME DE AVELA C/ CACAU VABENE 3KG", unidade: "und", embalagem: "1 und" },

  { id: 147, cod_forn: 127795, fornecedor: "AUREA", cod_produto: 621285, nome: "DOCE DE LEITE AUREA 9 8KG SORO TRADICIONAL", unidade: "und", embalagem: "1 und" },
  { id: 148, cod_forn: 127795, fornecedor: "AUREA", cod_produto: 621307, nome: "GELEIA BRILHO AUREA 4KG NEUTRO", unidade: "und", embalagem: "1 und" },

  { id: 149, cod_forn: 2624, fornecedor: "APINOR", cod_produto: 644854, nome: "MEL DE ABELHA APINOR 5KG SILVESTRE BALDE", unidade: "und", embalagem: "10 und" },

  { id: 150, cod_forn: 25509, fornecedor: "BONASSE/DISPAN", cod_produto: 42009, nome: "CUP CAKE 1KG INDIANO / MIST P/BOLO INDIANO BONASSE", unidade: "und", embalagem: "12 und" },
  { id: 151, cod_forn: 25509, fornecedor: "BONASSE/DISPAN", cod_produto: 42010, nome: "CUP CAKE 1KG RED VELVET / MIST P/BOLO REDE VALVET BONASSE", unidade: "und", embalagem: "12 und" },

  { id: 152, cod_forn: 579106, fornecedor: "POLENGHI/ARILU", cod_produto: 57092, nome: "CREAM CHEESE POLENGHI 1,5KG BISNAGA", unidade: "und", embalagem: "4 und" },
  { id: 153, cod_forn: 1864, fornecedor: "PIZZALET", cod_produto: 486094, nome: "REQUEIJÃO PIZZALET 1,8KG BISNAGA", unidade: "und", embalagem: "8 und" },

  { id: 154, cod_forn: 2513, fornecedor: "TIA OFELIA", cod_produto: 376710, nome: "MIST P BOLO OFELIA 5KG AIPIM", unidade: "und", embalagem: "5 und" },
  { id: 155, cod_forn: 2513, fornecedor: "TIA OFELIA", cod_produto: 279323, nome: "MIST P BOLO OFELIA 5KG BAUNILHA", unidade: "und", embalagem: "5 und" },
  { id: 156, cod_forn: 2513, fornecedor: "TIA OFELIA", cod_produto: 32231, nome: "MIST P BOLO OFELIA 5KG CHOCOLATE", unidade: "und", embalagem: "5 und" },
  { id: 157, cod_forn: 2513, fornecedor: "TIA OFELIA", cod_produto: 26294, nome: "MIST P BOLO OFELIA 5KG COCO", unidade: "und", embalagem: "5 und" },
  { id: 158, cod_forn: 2513, fornecedor: "TIA OFELIA", cod_produto: 558648, nome: "MIST P BOLO OFELIA 5KG LARANJA", unidade: "und", embalagem: "5 und" },
  { id: 159, cod_forn: 2513, fornecedor: "TIA OFELIA", cod_produto: 32234, nome: "MIST P BOLO OFELIA 5KG PAO DE LO", unidade: "und", embalagem: "2 und" },
  { id: 160, cod_forn: 2513, fornecedor: "TIA OFELIA", cod_produto: 57369, nome: "MIST P BOLO OFELIA 5KG FUBA", unidade: "und", embalagem: "5 und" },

  { id: 161, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 58022, nome: "ALGA MARINHA FUKUMATSU 50FLS 140G", unidade: "und", embalagem: "50 und" },
  { id: 162, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 12045, nome: "ARROZ MINAMI MAI 5KG CURTO JAPONES T1", unidade: "und", embalagem: "50 und" },
  { id: 163, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 61994, nome: "ARROZ MINAMI MAI 5KG LONGO JAPONES T1", unidade: "und", embalagem: "6 und" },
  { id: 164, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 294080, nome: "ESTEIRA DE BAMBOO 1LINHA L SEC SUSHI MAT", unidade: "und", embalagem: "10 und" },
  { id: 165, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 58025, nome: "MOLHO DE PIMENTA SWEET CHILI KIKKOMAN 5L", unidade: "und", embalagem: "1 und" },
  { id: 166, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 58026, nome: "PALITO HASHI MAKI 50 PARES BAMBU CHANFRADO", unidade: "und", embalagem: "10 und" },
  { id: 167, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 58024, nome: "PALITO HASHI MAKI C/50 PARES BAMBU REDONDO", unidade: "und", embalagem: "10 und" },
  { id: 168, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 58023, nome: "TEMPERO P/SUSHI AZUMA 5L", unidade: "und", embalagem: "4 und" },
  { id: 169, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 61995, nome: "ORNAMENTO PLASTICO BARAN CAIXA C/1.000 FOLHAS", unidade: "und", embalagem: "1 und" },
  { id: 170, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 61922, nome: "MOEDOR DE GERGILIM MANUAL PLAST GOMASURIKI", unidade: "und", embalagem: "1 und" },
  { id: 171, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 599131, nome: "MOLHO SHOYO MITSUWA PREMIUM 8ML SACHE CX C/ 250UND", unidade: "und", embalagem: "4 und" },
  { id: 172, cod_forn: 2787, fornecedor: "YOSHIDA", cod_produto: 59695, nome: "MOLHO TARE MITSUWA 12G SACHE CX C/ 250UND", unidade: "und", embalagem: "4 und" },

  { id: 173, cod_forn: 63081, fornecedor: "SALMÃO/MAJESTOSO", cod_produto: 56942, nome: "PEIXE SALMÃO FRESCO CAIXA C/ 30KG", unidade: "und", embalagem: "30 kg" },
  { id: 174, cod_forn: 2784, fornecedor: "COPACOL", cod_produto: 63629, nome: "FRANGO COPACOL FILE DE PEITO DESFIADO E TEMP 2KG", unidade: "und", embalagem: "4 und" },

  { id: 175, cod_forn: 2476, fornecedor: "ATUM/CHAMPGNON", cod_produto: 294543, nome: "CHAMPGNOM P/ PIZZA KG", unidade: "und", embalagem: "4 und" },
  { id: 176, cod_forn: 2476, fornecedor: "ATUM/CHAMPGNON", cod_produto: 529141, nome: "ATUM TOURS 400G RALADO OLEO", unidade: "und", embalagem: "24 und" },

  { id: 177, cod_forn: 6327, fornecedor: "ARAGONES", cod_produto: 605468, nome: "AZEITONA ARAGONES 40KG VERDE", unidade: "und", embalagem: "1 und" },
  { id: 178, cod_forn: 6327, fornecedor: "ARAGONES", cod_produto: 423785, nome: "AZEITONA ARAGONES 40KG PRETA", unidade: "und", embalagem: "1 und" },

  { id: 179, cod_forn: null, fornecedor: "FRIMESA", cod_produto: 146242, nome: "APRESUNTADO GD", unidade: "KG", embalagem: "14kg" },
  { id: 180, cod_forn: null, fornecedor: "FRIMESA", cod_produto: 492876, nome: "APRESUNTADO AM", unidade: "KG", embalagem: "14kg" },
  { id: 181, cod_forn: null, fornecedor: "FRIMESA", cod_produto: 201618, nome: "BACON MANTA", unidade: "KG", embalagem: "11kg" },
  { id: 182, cod_forn: null, fornecedor: "FRIMESA", cod_produto: 146471, nome: "CALABRESA NORMAL", unidade: "KG", embalagem: "6kg" },
  { id: 183, cod_forn: null, fornecedor: "FRIMESA", cod_produto: 582883, nome: "CALABRESA RETA", unidade: "KG", embalagem: "12kg" },
  { id: 184, cod_forn: null, fornecedor: "FRIMESA", cod_produto: 300179, nome: "PRESUNTO FRIMESA", unidade: "KG", embalagem: "14kg" },

  { id: 185, cod_forn: null, fornecedor: "LITORAL", cod_produto: 12703, nome: "LITORAL", unidade: "KG", embalagem: "24kg" },
  { id: 186, cod_forn: null, fornecedor: "TAPIRACUI", cod_produto: 146765, nome: "TAPIRACUI", unidade: "KG", embalagem: "24kg" },
  { id: 187, cod_forn: null, fornecedor: "LA PAULINA", cod_produto: 35587, nome: "LA PAULINA", unidade: "KG", embalagem: "24kg" },
  { id: 188, cod_forn: null, fornecedor: "PARDAL", cod_produto: 64287, nome: "PARDAL", unidade: "KG", embalagem: "24kg" },

  { id: 189, cod_forn: null, fornecedor: "LACTOLAR", cod_produto: 646628, nome: "PARMESÃO LACTOLAR", unidade: "KG", embalagem: "5kg" },
  { id: 190, cod_forn: null, fornecedor: "LACTOLAR", cod_produto: 40212, nome: "PROVOLONE LACTOLAR", unidade: "KG", embalagem: "5kg" },

  { id: 191, cod_forn: null, fornecedor: "TOP MILK", cod_produto: 627097, nome: "TOP MILK CHEDDAR 1,2KG", unidade: "und", embalagem: "12und" },
];

const fornecedores = Array.from(new Set(produtos.map((p) => p.fornecedor))).sort();

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

function getStepFromEmbalagem(embalagem) {
  if (!embalagem) return 1;
  const texto = String(embalagem).replace(",", ".").toLowerCase();
  const partes = texto.split(/[^0-9.]+/).filter(Boolean);
  const valor = Number(partes[0]);
  return Number.isFinite(valor) && valor > 0 ? valor : 1;
}

function formatarNumero(valor) {
  if (!Number.isFinite(Number(valor))) return "0";
  const numero = Number(valor);
  return Number.isInteger(numero) ? String(numero) : String(numero).replace(".", ",");
}

function formatarData(dataIso) {
  if (!dataIso) return "-";
  try {
    return new Date(dataIso).toLocaleString("pt-BR");
  } catch {
    return dataIso;
  }
}

async function salvarPedidoNoSupabase(payload) {
  if (!supabase) throw new Error("Supabase não configurado");

  const { data: pedido, error: pedidoError } = await supabase
    .from("pedidos")
    .insert({
      loja: payload.loja,
      fornecedor: payload.fornecedor,
      status: "enviado",
    })
    .select()
    .single();

  if (pedidoError) throw pedidoError;

  const itensInsert = payload.itens.map((item) => ({
    pedido_id: pedido.id,
    cod_produto: item.cod_produto,
    produto: item.nome,
    fornecedor: item.fornecedor,
    unidade: item.unidade,
    embalagem: item.embalagem,
    quantidade: item.quantidade,
  }));

  const { error: itensError } = await supabase.from("pedido_itens").insert(itensInsert);
  if (itensError) throw itensError;

  return { ...pedido, itens: payload.itens };
}

async function carregarPedidosDoSupabase() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("pedidos")
    .select("id, created_at, loja, fornecedor, status, pedido_itens(*)")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;

  return (data || []).map((pedido) => ({
    ...pedido,
    itens: pedido.pedido_itens || [],
  }));
}

function montarResumoConsolidado(pedidos) {
  const mapa = new Map();

  pedidos.forEach((pedido) => {
    const loja = pedido.loja;
    (pedido.itens || []).forEach((item) => {
      const chave = `${item.cod_produto || item.produto}-${item.produto || ""}`;
      if (!mapa.has(chave)) {
        mapa.set(chave, {
          cod_produto: item.cod_produto,
          produto: item.produto || item.nome,
          fornecedor: item.fornecedor || pedido.fornecedor,
          Matriz: 0,
          Dumont: 0,
          "Sumaré": 0,
          "Gugão Pvai": 0,
          "Gugão Nova L.": 0,
          "Gugão Alto": 0,
          "São Jorge": 0,
          total: 0,
        });
      }

      const linha = mapa.get(chave);
      const quantidade = Number(item.quantidade || 0);
      if (Object.prototype.hasOwnProperty.call(linha, loja)) {
        linha[loja] += quantidade;
      }
      linha.total += quantidade;
    });
  });

  return Array.from(mapa.values()).sort((a, b) =>
    String(a.produto).localeCompare(String(b.produto), "pt-BR")
  );
}

function StepChip({ active, done, number, label }) {
  return (
    <div className="step-chip">
      <div className={`step-circle ${done ? "done" : active ? "active" : ""}`}>
        {done ? "✓" : number}
      </div>
      <p className={active ? "step-label active" : "step-label"}>{label}</p>
    </div>
  );
}

function QuantityRow({ item, quantity, onChange }) {
  const passo = getStepFromEmbalagem(item.embalagem);

  return (
    <div className="quantity-row">
      <div className="quantity-info">
        <p className="product-name">{item.nome}</p>
        <div className="badges">
          <span className="badge badge-solid">{item.fornecedor}</span>
          <span className="badge">{item.embalagem}</span>
        </div>
      </div>
      <div className="quantity-controls">
        <p className="field-label">Pedido</p>
        <div className="control-group">
          <button className="btn small outline" onClick={() => onChange(Math.max(0, Number((quantity - passo).toFixed(3))))}>-</button>
          <input
            type="number"
            min="0"
            step={passo}
            value={quantity}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value || 0)))}
            className="input small"
          />
          <button className="btn small" onClick={() => onChange(Number((quantity + passo).toFixed(3)))}>+</button>
        </div>
      </div>
    </div>
  );
}

function OrdersList({ pedidos, carregando, onRefresh }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3>Pedidos enviados</h3>
          <p>Histórico organizado para consulta.</p>
        </div>
        <button className="btn outline" onClick={onRefresh}>
          <RefreshCw size={16} /> Atualizar
        </button>
      </div>
      <div className="card-content">
        {carregando && <div className="box-muted">Carregando pedidos...</div>}
        {!carregando && pedidos.length === 0 && (
          <div className="box-muted">Nenhum pedido salvo ainda.</div>
        )}
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="order-card">
            <div className="order-top">
              <div>
                <p className="order-store">{pedido.loja}</p>
                <p className="order-meta">
                  {pedido.fornecedor} • {formatarData(pedido.created_at)}
                </p>
              </div>
              <span className="badge">{pedido.itens?.length || 0} itens</span>
            </div>
            <div className="order-items">
              {(pedido.itens || []).map((item, idx) => (
                <div key={`${pedido.id}-${idx}`} className="order-item">
                  <span>{item.produto || item.nome}</span>
                  <strong>{formatarNumero(item.quantidade)}</strong>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabelaResumoConsolidado({ pedidos }) {
  const resumo = montarResumoConsolidado(pedidos);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3>Resumo geral consolidado</h3>
          <p>Visualização no estilo planilha com cada loja e o total final.</p>
        </div>
      </div>
      <div className="card-content">
        {resumo.length === 0 ? (
          <div className="box-muted">Nenhum dado consolidado ainda.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Fornecedor</th>
                  <th>Matriz</th>
                  <th>Dumont</th>
                  <th>Sumaré</th>
                  <th>Gugão Pvai</th>
                  <th>Gugão Nova L.</th>
                  <th>Gugão Alto</th>
                  <th>São Jorge</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {resumo.map((linha) => (
                  <tr key={`${linha.cod_produto}-${linha.produto}`}>
                    <td>{linha.produto}</td>
                    <td>{linha.fornecedor}</td>
                    <td>{formatarNumero(linha.Matriz)}</td>
                    <td>{formatarNumero(linha.Dumont)}</td>
                    <td>{formatarNumero(linha["Sumaré"])}</td>
                    <td>{formatarNumero(linha["Gugão Pvai"])}</td>
                    <td>{formatarNumero(linha["Gugão Nova L."])}</td>
                    <td>{formatarNumero(linha["Gugão Alto"])}</td>
                    <td>{formatarNumero(linha["São Jorge"])}</td>
                    <td><strong>{formatarNumero(linha.total)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [loja, setLoja] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [busca, setBusca] = useState("");
  const [quantidades, setQuantidades] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [modoConectado, setModoConectado] = useState(!!supabase);
  const [pedidos, setPedidos] = useState([]);
  const [carregandoPedidos, setCarregandoPedidos] = useState(false);

  const progresso = step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;

  const itensFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      const okFornecedor = fornecedor ? p.fornecedor === fornecedor : true;
      const termo = busca.toLowerCase();
      const okBusca = termo
        ? p.nome.toLowerCase().includes(termo) ||
          String(p.cod_produto).includes(termo) ||
          p.fornecedor.toLowerCase().includes(termo)
        : true;
      return okFornecedor && okBusca;
    });
  }, [fornecedor, busca]);

  const totalItens = Object.values(quantidades).reduce((acc, n) => acc + Number(n || 0), 0);

  const itensSelecionados = produtos
    .filter((p) => Number(quantidades[p.id]) > 0)
    .map((p) => ({ ...p, quantidade: Number(quantidades[p.id]) }));

  const salvarQuantidade = (id, valor) => {
    setQuantidades((q) => ({ ...q, [id]: valor }));
  };

  const carregarPedidos = async () => {
    setCarregandoPedidos(true);
    try {
      const dados = await carregarPedidosDoSupabase();
      setPedidos(dados);
      setModoConectado(!!supabase);
    } catch {
      setPedidos([]);
      setModoConectado(false);
    } finally {
      setCarregandoPedidos(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const enviarPedido = async () => {
    setErro("");
    setSalvando(true);
    try {
      const payload = {
        loja,
        fornecedor,
        itens: itensSelecionados,
      };
      const novoPedido = await salvarPedidoNoSupabase(payload);
      setPedidos((atual) => [novoPedido, ...atual]);
      setStep(5);
    } catch {
      setErro("Não foi possível salvar o pedido agora.");
    } finally {
      setSalvando(false);
    }
  };

  const resetar = () => {
    setStep(1);
    setLoja("");
    setFornecedor("");
    setBusca("");
    setQuantidades({});
    setErro("");
  };

  return (
    <div className="page">
      <div className="container">
        <div className="top-grid">
          <div className="card">
            <div className="card-header">
              <div>
                <h1 className="titulo-app">
  <span>App de Pedidos</span>
  <span>das Lojas</span>
</h1>
<p className="subtitulo-app">Versão pronta para salvar pedidos em banco de dados com Supabase.</p>
              </div>
              <div className="icon-box">
                <ShoppingCart size={28} />
              </div>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progresso}%` }} />
            </div>

            <div className="steps-grid">
              <StepChip number={1} label="Escolher loja" active={step === 1} done={step > 1} />
              <StepChip number={2} label="Filtrar fornecedor" active={step === 2} done={step > 2} />
              <StepChip number={3} label="Lançar pedido" active={step >= 3} done={step > 3} />
            </div>

            <div className="card-content">
              {step === 1 && (
                <div className="space-y">
                  <div>
                    <h2>Escolha sua loja</h2>
                    <p>O funcionário seleciona a unidade antes de começar o pedido.</p>
                  </div>

                  <div className="store-grid">
                    {lojas.map((nome) => {
                      const ativo = loja === nome;
                      return (
                        <button
                          key={nome}
                          onClick={() => setLoja(nome)}
                          className={`store-card ${ativo ? "active" : ""}`}
                        >
                          <Store size={24} />
                          <p>{nome}</p>
                          <span>Entrar nesta loja</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="actions-end">
                    <button disabled={!loja} className="btn" onClick={() => setStep(2)}>
                      Continuar <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y">
                  <div className="title-row">
                    <button className="btn outline small" onClick={() => setStep(1)}>
                      <ChevronLeft size={16} />
                    </button>
                    <div>
                      <h2>Filtre a empresa</h2>
                      <p>Escolha o fornecedor para mostrar só os produtos daquela empresa.</p>
                    </div>
                  </div>

                  <div className="supplier-grid">
                    {fornecedores.map((nome) => {
                      const ativo = fornecedor === nome;
                      return (
                        <button
                          key={nome}
                          onClick={() => setFornecedor(nome)}
                          className={`store-card ${ativo ? "active" : ""}`}
                        >
                          <Building2 size={24} />
                          <p>{nome}</p>
                          <span>Ver produtos deste fornecedor</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="actions-end">
                    <button disabled={!fornecedor} className="btn" onClick={() => setStep(3)}>
                      Ver produtos <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y">
                  <div className="title-row">
                    <button className="btn outline small" onClick={() => setStep(2)}>
                      <ChevronLeft size={16} />
                    </button>
                    <div>
                      <h2>Lançar pedido</h2>
                      <p>Digite as quantidades e confirme o envio.</p>
                    </div>
                  </div>

                  <div className="search-row">
                    <div className="search-box">
                      <Search size={16} />
                      <input
                        placeholder="Buscar produto ou código"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                      />
                    </div>
                    <div className="filter-badge">
                      <Filter size={16} /> {fornecedor}
                    </div>
                  </div>

                  <div className="items-list">
                    {itensFiltrados.map((item) => (
                      <QuantityRow
                        key={item.id}
                        item={item}
                        quantity={Number(quantidades[item.id] || 0)}
                        onChange={(valor) => salvarQuantidade(item.id, valor)}
                      />
                    ))}
                  </div>

                  <div className="actions-end">
                    <button disabled={itensSelecionados.length === 0} className="btn" onClick={() => setStep(4)}>
                      Revisar pedido <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y">
                  <div className="title-row">
                    <button className="btn outline small" onClick={() => setStep(3)}>
                      <ChevronLeft size={16} />
                    </button>
                    <div>
                      <h2>Confirmar pedido</h2>
                      <p>Confira antes de salvar.</p>
                    </div>
                  </div>

                  {erro && <div className="error-box">{erro}</div>}

                  <div className="review-grid">
                    <div className="stat-box">
                      <p>Loja</p>
                      <strong>{loja}</strong>
                    </div>
                    <div className="stat-box">
                      <p>Fornecedor</p>
                      <strong>{fornecedor}</strong>
                    </div>
                  </div>

                  <div className="items-list">
                    {itensSelecionados.map((item) => (
                      <div key={item.id} className="review-item">
                        <div>
                          <p className="product-name">{item.nome}</p>
                          <p className="muted">{item.embalagem}</p>
                        </div>
                        <span className="badge">{formatarNumero(item.quantidade)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="actions-end gap">
                    <button className="btn outline" onClick={() => setStep(3)}>Ajustar</button>
                    <button className="btn" onClick={enviarPedido} disabled={salvando}>
                      {salvando ? "Salvando..." : "Salvar pedido"}
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y">
                  <div className="success-box">
                    <CheckCircle2 size={40} />
                    <h2>Pedido salvo com sucesso</h2>
                    <p>
                      {modoConectado
                        ? "O pedido foi salvo no banco de dados e já aparece no histórico ao lado."
                        : "O app está em modo demonstração. Para salvar de verdade, configure o Supabase."}
                    </p>
                  </div>
                  <div className="actions-start gap">
                    <button className="btn" onClick={resetar}>Novo pedido</button>
                    <button className="btn outline" onClick={carregarPedidos}>Atualizar histórico</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <h3>Resumo rápido</h3>
                <p>Visão simples para o funcionário preencher sem erro.</p>
              </div>
            </div>
            <div className="card-content stats">
              <div className="stat-box">
                <p>Loja escolhida</p>
                <strong>{loja || "Nenhuma"}</strong>
              </div>
              <div className="stat-box">
                <p>Fornecedor</p>
                <strong>{fornecedor || "Nenhum"}</strong>
              </div>
              <div className="stat-box">
                <p>Quantidade total lançada</p>
                <strong>{formatarNumero(totalItens)}</strong>
              </div>
              <div className="stat-box">
                <p>Produtos preenchidos</p>
                <strong>{itensSelecionados.length}</strong>
              </div>
              <div className="stat-box">
                <p>Status</p>
                <strong className="status-line">
                  <Database size={18} />
                  {modoConectado ? "Conectado ao Supabase" : "Modo demonstração"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="main-grid">
          <div className="side-column">
            <TabelaResumoConsolidado pedidos={pedidos} />
            <OrdersList pedidos={pedidos} carregando={carregandoPedidos} onRefresh={carregarPedidos} />
          </div>
        </div>
      </div>
    </div>
  );
}