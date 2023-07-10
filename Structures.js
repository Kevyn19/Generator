import CommonStyles from "./CommonStyles"
import uuid from 'react-native-uuid'; // reomver depois

export default {

    locations :{
        semple: [uuid.v4(),uuid.v4(),new Date(),new Date()], // remover depois
        title: 'Locations',
        icon: 'map-marker',
        headerButtons: [],
        toggleButtons: [],
        columns: [
            {
                label:'Location',
                value: '',
                type: 'text'
            }, 
            {
                label:'Destination',
                value: '',
                type: 'text'
            }, 
            {
                label:'Created At',
                value: '',
                type: 'date'
             }
             , 
            {
                label:'Update At',
                value: '',
                type: 'date'
            }
        ],
        sideButtons: [
         
        ]
    },

    //***********************//
    //***********************//
    

    events : {
        semple: [uuid.v4(),uuid.v4(), ['New','Pending','Ready'] ,['Low', 'Medium', 'High', 'Extreme'], uuid.v4(),uuid.v4(),uuid.v4(),new Date()], // remover depois
        title: 'Events',
        icon: 'map-marker',
        headerButtons: [
            {
                text: 'Export',
                icon: 'download',
                screenToRedirect: '',
                param: {}
            },
          
            {
                text: '+ Create a new one',
                icon: '',
                screenToRedirect: '',
                param: {}
            }
        ],
        toggleButtons: [
            {
                label: 'Show my events',
                value: false
            },
            {
                label: 'Show my company events',
                value: false
            }
            
        ],
        columns: [
            {
                label:'Location',
                value: '',
                type: 'text'
            }, 
            {
                label:'Discipline',
                value: '',
                type: 'text'
            }, 
            {
                label:'Status',
                value: [
                   
                    {
                        label:'New',
                        color: CommonStyles.colors.green,
                        checked: false
                    },
                    {
                        label:'Pending',
                        color: CommonStyles.colors.blue,
                        checked: false
                    },
                    {
                        label:'Ready',
                        color: CommonStyles.colors.darkBlue,
                        checked: false
                    }
                   
                ], // aqui vai todos os valores possiveis do selecmulti
                type: 'enum'
            }, 
            {
                label:'Priority',
                value: [
                    {
                        label:'Low',
                        color: CommonStyles.colors.green,
                        checked: false
                    },
                    {
                        label:'Medium',
                        color: CommonStyles.colors.yellow,
                        checked: false
                    },
                    {
                        label:'High',
                        color: CommonStyles.colors.red,
                        checked: false
                    },
                    {
                        label:'Extreme',
                        color: 'black',
                        checked: false
                    }
                   
                ], // aqui vai todos os valores possiveis do selecmulti
                type: 'enum'
            },
            {
                label:'Created By',
                value: '',
                type: 'text'
            }, 
            {
                label:'Assigned By',
                value: '',
                type: 'text'
            }, 
            {
                label:'Descruption',
                value: '',
                type: 'text'
            }, 
            {
                label:'Created At',
                value: '',
                type: 'date'
            }
        ],
        sideButtons: [
            {
                icon: 'download',
                color: CommonStyles.colors.opaqueBlue,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon: 'trash',
                color: CommonStyles.colors.red,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon:'pencil',
                color: CommonStyles.colors.blue,
                screenToRedirect: '',
                param: {}
            }
        ]
        
    },


    //***********************//
    //***********************//
    documentsAlert: {
        semple: [uuid.v4(),uuid.v4()], // remover depois
        title: 'Documents alerts',
        icon: 'file',
        headerButtons: [],
        toggleButtons: [],
        columns: [
            {
                label:'Location',
                value: '',
                type: 'text'
            }, 
            {
                label:'Chapter',
                value: '',
                type: 'text'
            } 
            
        ],
        sideButtons: [
            {
                icon: 'download',
                color: CommonStyles.colors.opaqueBlue,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon: 'trash',
                color: CommonStyles.colors.red,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon:'pencil',
                color: CommonStyles.colors.blue,
                screenToRedirect: '',
                param: {}
            }
        ]
    },


    //***********************//
    //***********************// 
    users:{
        semple: [uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(),true,uuid.v4(),new Date(),new Date()], // remover depois
        title: 'Users',
        icon: 'users',
        headerButtons: [
            {
                text: '+ Create a new one',
                icon: '',
                screenToRedirect: '',
                param: {}
            }
        ],
        toggleButtons: [],
        columns: [
            {
                label:'E-mail',
                value: '',
                type: 'text'
            }, 
            {
                label:'First Name',
                value: '',
                type: 'text'
            } ,
            {
                label:'Insertion',
                value: '',
                type: 'text'
            },
            {
                label:'Last Name',
                value: '',
                type: 'text'
            },
            {
                label:'Active',
                value: true,
                type: 'bool'
            },
            {
                label:'Company',
                value: '',
                type: 'text'
            },
            {
                label:'Created At',
                value: '',
                type: 'date'
            },
            {
                label:'Updated At',
                value: '',
                type: 'date'
            }

            
        ],
        sideButtons: [
            {
                icon: 'download',
                color: CommonStyles.colors.opaqueBlue,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon: 'trash',
                color: CommonStyles.colors.red,
                screenToRedirect: '',
                param: {}
    
            }
        ]
    },
    //***********************//
    //***********************// 
    organizations: {
        semple: [uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(), true,new Date(),new Date()], // remover depois
        title: 'Organizations',
        icon: 'users',
        headerButtons: [
            {
                text: '+ Create a new one',
                icon: '',
                screenToRedirect: '',
                param: {}
            }
        ],
        toggleButtons: [],
        columns: [
            {
                label:'Name',
                value: '',
                type: 'text'
            }, 
            {
                label:'Address',
                value: '',
                type: 'text'
            },
            {
                label:'City',
                value: '',
                type: 'text'
            } ,
            {
                label:'Postal Code',
                value: '',
                type: 'text'
            },
            {
                label:'Active',
                value: true,
                type: 'bool'
            },
            {
                label:'Created At',
                value: '',
                type: 'date'
            },
            {
                label:'Updated At',
                value: '',
                type: 'date'
            }
            
        ],
        sideButtons: [
            
            {
                icon: 'trash',
                color: CommonStyles.colors.red,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon:'pencil',
                color: CommonStyles.colors.blue,
                screenToRedirect: '',
                param: {}
            }
        ]
    },

    //***********************//
    //***********************// 
    contractors:{
        semple: [uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(), true,new Date(),new Date()], // remover depois
        title: 'Contractors',
        icon: 'users',
        headerButtons: [
            {
                text: '+ Create a new one',
                icon: '',
                screenToRedirect: '',
                param: {}
            }
        ],
        toggleButtons: [],
        columns: [
            {
                label:'Name',
                value: '',
                type: 'text'
            }, 
            {
                label:'Address',
                value: '',
                type: 'text'
            },
            {
                label:'City',
                value: '',
                type: 'text'
            } ,
            {
                label:'Postal Code',
                value: '',
                type: 'text'
            },
            {
                label:'Active',
                value: true,
                type: 'bool'
            },
            {
                label:'Created At',
                value: '',
                type: 'date'
            },
            {
                label:'Updated At',
                value: '',
                type: 'date'
            }
            
        ],
        sideButtons: [
            
            {
                icon: 'trash',
                color: CommonStyles.colors.red,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon:'pencil',
                color: CommonStyles.colors.blue,
                screenToRedirect: '',
                param: {}
            }
        ]
    },
    //***********************//
    //***********************// 

    disciplines:{
        semple: [uuid.v4(),true,new Date(),new Date()], // remover depois
        title: 'Disciplines',
        icon: 'users',
        headerButtons: [
            {
                text: '+ Create a new one',
                icon: '',
                screenToRedirect: '',
                param: {}
            }
        ],
        toggleButtons: [],
        columns: [
            {
                label:'Name',
                value: '',
                type: 'text'
            }, 
            {
                label:'Active',
                value: true,
                type: 'bool'
            }, 
            {
                label:'Created At',
                value: '',
                type: 'date'
            },
            {
                label:'Updated At',
                value: '',
                type: 'date'
            }
            
        ],
        sideButtons: [
            
            {
                icon: 'trash',
                color: CommonStyles.colors.red,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon:'pencil',
                color: CommonStyles.colors.blue,
                screenToRedirect: '',
                param: {}
            }
        ]
    },

    contracts:{
        semple: [uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(),true,new Date(),new Date()], // remover depois
        title: 'Contracts',
        icon: 'users',
        headerButtons: [
            {
                text: '+ Create a new one',
                icon: '',
                screenToRedirect: '',
                param: {}
            }
        ],
        toggleButtons: [],
        columns: [
            {
                label:'Organizations',
                value: '',
                type: 'text'
            }, 
            {
                label:'Contractor',
                value: '',
                type: 'text'
            }, 
            {
                label:'Location',
                value: '',
                type: 'text'
            }, 
            {
                label:'Discipline',
                value: '',
                type: 'text'
            },
            {
                label:'Active',
                value: true,
                type: 'bool'
            },
            {
                label:'Created At',
                value: '',
                type: 'date'
            },
            {
                label:'Updated At',
                value: '',
                type: 'date'
            }
            
        ],
        sideButtons: [
            
            {
                icon: 'trash',
                color: CommonStyles.colors.red,
                screenToRedirect: '',
                param: {}
    
            },
            {
                icon:'pencil',
                color: CommonStyles.colors.blue,
                screenToRedirect: '',
                param: {}
            }
        ]  
    }

}
