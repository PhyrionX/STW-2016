# SisTecWeb
Practicas Sistemas y Tecnologias Web

{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Prueba de nivel de Python\n",
    "Se compone de los siguientes ejercicios:\n",
    "- **Lista balanceada** 15 puntos\n",
    "- **Diccionario invertido** 10 puntos\n",
    "- **Generador no único** 15 puntos\n",
    "- **Clase musical** 10 puntos\n",
    "- **Carrera vertical** 30 puntos\n",
    "\n",
    "Sobre los 80 puntos hay que alcanzar un mínimo de 50 puntos para pasar la prueba de nivel. Se tendrá en cuenta que la solución sea corta y robusta.\n",
    "\n",
    "Se espera por parte de los participantes un compromiso de honestidad. Las respuestas son sencillas y cortas pero no hay una única solucion posible a todas ellas. Se verificará que el trabajo realizado por cada uno es individual. Si hay sospechas de que ese trabajo no es individual, dicho trabajo no pasará la prueba de nivel. \n",
    "\n",
    "Fecha de entrega 23:59h del 17 de Abril"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "**Lista balanceada**: Tenemos una lista de tokens compuesta de paréntesis abiertos, paréntesis cerrados y enteros de 1 a 9. Una lista está bien formada si los paréntesis están balanceados y cada entero indica el número de pares de paréntesis que rodean a dicho valor.\n",
    "\n",
    "Implementar ```bien_formada```, que toma una lista de tokens y devuelve ```True``` si y solo si la lista de tokens está bien formada. \n",
    "\n",
    "```\n",
    "> print bien_formada(list('(1)'))\n",
    "True\n",
    "> print bien_formada(list('(2)'))\n",
    "False\n",
    "> print bien_formada(list('((2)((3)))'))\n",
    "True\n",
    "> print bien_formada(list('((3)((2)))'))\n",
    "False\n",
    "> print bien_formada(list('(((3)((4))(3))(2)((3)))'))\n",
    "True\n",
    "```\n",
    "\n",
    "\n",
    "Usa el siguiente código de partida:\n",
    "\n",
    "```\n",
    "def bien_formada(s, depth=0):\n",
    "    try:\n",
    "        first = s.pop(0)\n",
    "        if first != '(':\n",
    "            return depth == int(first)\n",
    "```"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {
    "collapsed": false
   },
   "outputs": [],
   "source": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "**Diccionario invertido**: La función ``invertir`` toma un diccionario y devuelve un diccionario nuevo donde los valores son claves y las claves se convierten en una lista de valores. Si un valor no puede convertirse en clave se descarta.\n",
    "```\n",
    "> print(invertir({'a':5, 'b':3, 'c':2, 'd':3}))\n",
    "{2: ['c'], 3: ['b', 'd'], 5: ['a']}\n",
    "> print(invertir({'a':5, 'b':3, 'c':[2], 'd':3}))\n",
    "{3: ['b', 'd'], 5: ['a']}\n",
    "```"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {
    "collapsed": false
   },
   "outputs": [],
   "source": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "**Generador no único**: La función generadora ``no_unico`` toma cualquier iterable como argumento y devuelve un iterador sobre todos los elementos no únicos en el orden en el que se detecta que no son únicos.\n",
    "\n",
    "```\n",
    "> list(no_unico([1, 3, 2, 2, 5, 3, 4, 1]))\n",
    "[2, 3, 1]\n",
    "```"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {
    "collapsed": false
   },
   "outputs": [],
   "source": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "**Clase musical**: Crea una clase denominada `Cancion` que tenga un método `play`que escriba en pantalla las estrofas de una canción que se le haya pasado en el constructor.\n",
    "```\n",
    "> cancion = Cancion([\"Cumpleaños feliz\", \"Cumpleaños feliz\", \"Te deseamos todos\", \"Cumpleaños feliz\"])\n",
    "> cancion.play()\n",
    "Cumpleaños feliz\n",
    "Cumpleaños feliz\n",
    "Te deseamos todos\n",
    "Cumpleaños feliz\n",
    "```"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {
    "collapsed": false
   },
   "outputs": [],
   "source": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "**Carrera Vertical:** Un corredor participa en una carrera vertical de _n_ escalones pudiendo subir 1, 2 ó 3 escalones cada vez. Implementa una función que cuente todas las formas posibles de subir _n_ escalones.\n",
    "```\n",
    "> print staircaseCount(1)\n",
    "1\n",
    "> print staircaseCount(2)\n",
    "2\n",
    "> print staircaseCount(3)\n",
    "4\n",
    "> print staircaseCount(4)\n",
    "7\n",
    "```\n",
    "La función debe ser capaz de computar en milisegundos cuantas formas posibles hay de subir 2500 escalones.\n",
    "```\n",
    "> print staircaseCount(2500)\n",
    "25995141303821807172626236125906607615866791331561915620894574816921166800783923163332957535456271118463859873532852472723081575732040959420569217974251649035410975341213005762974633863697137749526890977505439660087436608713532914323869402616134445658944972896728120963411762122409556001067164509550348737157978465715896564604789452958067810550967263935696654067812304084042952611890333378496696245046542645295156787769713726767193263664300047841280740907689056815793889572131230684861580654047165401179620363687057859687709472816310747945105347461038894919004972392012629651907230981574199275727359628753065632760532058527830684202805216236662454100846575950215\n",
    "```"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {
    "collapsed": false,
    "scrolled": true
   },
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 2",
   "language": "python",
   "name": "python2"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 2
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython2",
   "version": "2.7.9"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 0
}