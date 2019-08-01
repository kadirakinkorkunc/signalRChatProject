using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using signalRChatProject.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace signalRChatProject
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
        
            // angular'ı farklı porttan kullanacağımız için signalR server'ine erişmek için cors'u kullanmamız gerekiyor
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
                {
                    builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithOrigins("http://localhost:4200");
                }));
            // angular'ı farklı porttan kullanacağımız için signalR server'ine erişmek için cors'u kullanmamız gerekiyor

            services.AddSignalR(); //signalR ı kullanmak için servis olarak ekliyoruz

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            
            }
            

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseCors("CorsPolicy"); // cors servisini kullanmak için aktif ediyoruz. //middleware pipeline

            app.UseSignalR(routes => {  // signalR için route belirleniyor.
                routes.MapHub<ChatHub>("/chatpage");  //ChatHub classı bu sayfayı idare edicek.  //middleware pipeline
            });
            app.UseMvc();
        }
    }
}
