# [HTML to Hyper](https://html-to-hyper.vercel.app)

Convert HTML to hyper:

```html
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown button</button>
  <ul class="dropdown-menu dropdown-menu-dark">
    <li><a class="dropdown-item active" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>
```

becomes:

```ts
h("root", {}, [
  h("div", { className: "dropdown" }, [
    h("button", { className: "btn btn-secondary dropdown-toggle", type: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false", textContent: "Dropdown button" }),
    h("ul", { className: "dropdown-menu dropdown-menu-dark" }, [
      h("li", {}, [h("a", { className: "dropdown-item active", href: "#", textContent: "Action" })]),
      h("li", {}, [h("a", { className: "dropdown-item", href: "#", textContent: "Another action" })]),
      h("li", {}, [h("hr", { className: "dropdown-divider" })]),
      h("li", {}, [h("a", { className: "dropdown-item", href: "#", textContent: "Separated link" })]),
    ]),
  ]),
])
```

[Try it by clicking this link](https://html-to-hyper.vercel.app)
