const { Menu } = require('electron')
const electron = require('electron')
const shell = require('electron').shell
const app = electron.app

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New..', 
                submenu: [
                    {
                        label: 'Project',
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+P' : 'Ctrl+Alt+P',
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('open-project')
                        },
                    },
                    {
                        label: 'Group', 
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+G' : 'Ctrl+Alt+G',
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('open-group')
                            //focusedWindow.electron.doThing();
                            //ipcRenderer.send('open-modal', 'browsers/group/group_modal.html')
                        }
                    }
                ]
            },
            {
                label: 'Preferences'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Themes',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+T' : 'Ctrl+T',
                click(item, focusedWindow) {
                    focusedWindow.webContents.send('open-theme')
                }
            }, 
        ]
    },
    {
        label: 'View',
        submenu: [
            {  
                label: 'Search', 
                accelerator: process.platform === 'darwin' ? 'Command+F' : 'Ctrl+F',
                click(item, focusedWindow) {
                    focusedWindow.webContents.executeJavaScript('search_bar.checked = !search_bar.checked')
                }
            },
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click (item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload()
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click (item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click () { shell.openExternal('http://electron.atom.io') }
            }, 
            {
                label: 'GitHub', 
                click() { shell.openExternal('http://github.com/StaniPetrosyan/SubZero') }
            },
            {
                label: 'Info'
            }
        ]
    }
]

if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
        label: name,
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    })
    template[1].submenu.push(
        {
            type: 'separator'
        },
        {
            label: 'Speech',
            submenu: [
                {
                    role: 'startspeaking'
                },
                {
                    role: 'stopspeaking'
                }
            ]
        }
    )
    template[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)