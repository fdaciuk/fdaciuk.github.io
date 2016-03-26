# me

```js
const da2k = (link) => {
  return {
    'blog': 'http://blog.da2k.com.br',
    'curso-js-ninja': 'http://www.eventick.com.br/curso-javascript-ninja',
    'curso-git-e-github-ninja': 'http://www.eventick.com.br/curso-git-e-github-ninja'  
  }[link]
}
```

[`da2k('blog')`][blog]
```js
// http://blog.da2k.com.br
```

[`da2k('curso-js-ninja')`][js-ninja] 
```js
// http://www.eventick.com.br/curso-javascript-ninja
```

[`da2k('curso-git-e-github-ninja')`][git-github-ninja]
```js
// http://www.eventick.com.br/curso-git-e-github-ninja
```

[blog]: http://blog.da2k.com.br
[js-ninja]: http://www.eventick.com.br/curso-javascript-ninja
[git-github-ninja]: http://www.eventick.com.br/curso-git-e-github-ninja
