const app = typeof window !== 'undefined' ? window : global

app.uNavPages = {}

const uNav = function() {
  this.mounted = null
  this.loadedScripts = []
  this.loadedStyles = []
}

uNav.prototype.link = function({name, scripts = undefined, styles = undefined}) {
  if (!name) throw new Error("name is required")
  const self = this
  return function(e) {
    if (e && e.preventDefault) e.preventDefault()
    return self.mount({name: name, scripts: scripts, styles: styles})
  }
}

uNav.prototype.mount = function(page) {
  return new Promise((resolve) => {
    if (!this.mounted || page.name !== this.mounted.name) {
      this.handleStyles(page.styles, page.name)
      this.handleScripts(page.scripts, page.name).then(() => {
        if (!app.uNavPages[page.name]) throw new Error("Config Not Present in " + page.name)
        const mount = app.uNavPages[page.name].mount
        const unmount = app.uNavPages[page.name].unmount
        if (typeof mount !== "function" || typeof unmount !== "function") throw new Error("mount and unmount must be functions")
        if (this.mounted) this.mounted.unmount()
        page.mount = mount
        page.unmount = unmount
        mount()
        this.mounted = page
        resolve()
      })
    } else {
      resolve()
    }
  });
}

uNav.prototype.handleScripts = function(scripts, name) {
  if (scripts && scripts.length) {
    return Promise.all(scripts.reduce((p, c) => {
      const key = "C" + c.replace(/ |\.|\\|\//g, "") + "x" + name.replace(/ |\.|\\|\//g, "")
      if (this.loadedScripts.indexOf(key) === -1) {
        this.loadedScripts.push(key)
        p.push(this.loadScript(c, key))
      }
      return p
    }, []))
  } else {
    return Promise.resolve()
  }
}

uNav.prototype.handleStyles = function(styles, name) {
  this.loadedStyles = this.loadedStyles.map(s => {
    if (s.enabled) {
      this.unloadStyle(s.key)
      return {style: s.style, key: s.key, enabled: false}
    }
    return s
  })
  if (styles && styles.length) {
      styles.forEach(style => {
      const key = "T" + style.replace(/ |\.|\\|\//g, "") + "x" + name.replace(/ |\.|\\|\//g, "")
      const thisStyle = this.loadedStyles.find(s => s.key === key)
      if (!thisStyle) {
        this.loadStyle(style, key)
        this.loadedStyles.push({url: style, enabled: true, key: key})
      } else {
        this.reloadStyle(key)
        thisStyle.enabled = true
      }
    })
  }
}

uNav.prototype.loadScript = function(url, id) {
  return new Promise((resolve, reject) => {
    if (document) {
      const scriptTag = document.createElement('script')
      scriptTag.onload = resolve
      scriptTag.onreadystatechange = resolve
      scriptTag.src = url
      scriptTag.id = id
      scriptTag.type = "application/javascript"
      document.body.appendChild(scriptTag)
    } else {
      reject("Not in Browser Environment")
    }
  });
}

uNav.prototype.loadStyle = function(url, id) {
  return new Promise((resolve, reject) => {
    if (document) {
      const head  = document.getElementsByTagName('head')[0]
      const link  = document.createElement('link')
      link.id  = id
      link.rel  = 'stylesheet'
      link.type = 'text/css'
      link.href = url
      link.media = 'all'
      link.onload = resolve
      link.onreadystatechange = resolve
      head.appendChild(link)
    } else {
      reject("Not in Browser Environment")
    }
  });
}

uNav.prototype.unloadStyle = function(id) {
  document.getElementById(id).disabled = true
}

uNav.prototype.reloadStyle = function(id) {
  document.getElementById(id).disabled = false
}

if (typeof window !== 'undefined') {
  window.uNav = uNav
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports =  uNav
}
