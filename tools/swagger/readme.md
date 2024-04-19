# Openapi spec generation

```
node ./swagger.js
```

# Client generation

```
openapi-generator-cli.cmd generate
    --input-spec ./tools/swagger/thm-specification.openapi.json
    --generator-name csharp
    --output ./open-api/clients/csharp
    --library generichost
    --import-mappings TimeSpan=System
    --type-mappings SystemTimeSpan=TimeSpan
    --additional-properties apiName=ThmApi,equatable=true,library=generichost,netCoreProjectFile=true,nullableReferenceTypes=true,packageName=PokerEvents.Clients.THM,packageVersion=0.0.1,targetFramework=net8.0,zeroBasedEnums=true,useDateTimeForDate=true
```
