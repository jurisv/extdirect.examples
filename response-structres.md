####This document summarizes all standard serverside responses that are expected by client.


All responses are now unified and expect this format:

```json
{
success:true,
data:[
    {
    something: 'nice'
    }
]
},
total: 1
```