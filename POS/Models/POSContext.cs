using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS.Models
{
    public class POSContext : DbContext
    {
        public POSContext(DbContextOptions options)
            : base(options)
        {
        }

        //public DbSet<Employee> Employees { get; set; }
        //public DbSet<Company> Companys { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<FavouriteOrder> FavouriteOrders { get; set; }
        public DbSet<Inventory> Inventorys { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Purchaser> Purchasers { get; set; }
        public DbSet<Status> Statuses { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            

            //modelBuilder.Entity<Order>().HasOne(o => o.DeliverBy).WithMany(o=>o.DeliverOrders).HasForeignKey(o => o.DeliverById);
            //modelBuilder.Entity<Order>().HasOne(o => o.CreatedBy).WithMany(o => o.CreatedOrders).HasForeignKey(o => o.CreatedBy_UserId);
            //modelBuilder.Entity<Order>().HasOne(o => o.ModifiedBy).WithMany(o => o.ModifiedOrders).HasForeignKey(o => o.ModifiedBy_UserId);

            //modelBuilder.Entity<Order>().HasOne(o => o.Status).WithMany().HasForeignKey(o=>o.StatusId);
            //modelBuilder.Entity<Order>().HasOne(o => o.Purchaser).WithMany().HasForeignKey(o => o.PurchaserId);

            modelBuilder.Entity<Order>().HasMany(o => o.OrderItems).WithOne(o => o.Order).HasForeignKey(o=>o.OrderId);

            modelBuilder.Entity<FavouriteOrder>().HasOne(o => o.User).WithMany(o => o.FavouriteOrders).HasForeignKey(o => o.UserId);

            modelBuilder.Entity<Purchaser>().HasMany(o => o.Orders).WithOne(o => o.Purchaser).HasForeignKey(o => o.PurchaserId);

            //modelBuilder.Entity<Order>().HasOne(o => o.DeliverBy).WithMany(o=>o.DeliverOrders).HasForeignKey(o => o.DeliverById); ;


            //modelBuilder.Entity<OrderItem>().HasOne(o => o.Order).WithMany(o => o.OrderItems);
            //modelBuilder.Entity<OrderItem>().HasOne(o => o.Inventory).WithMany();



            //modelBuilder.Entity<Purchaser>().HasMany(o => o.Orders).WithOne(o => o.Purchaser);


            //modelBuilder.Entity<User>().HasMany<Order>(g => g.FavouriteOrder).WithOne();

            //modelBuilder.Entity<User>().HasMany<Inventory>(g => g.CreatedInventories).WithOne(o => o.CreatedBy).HasForeignKey(o => o.CreatedBy_UserId);
            //modelBuilder.Entity<User>().HasMany<Inventory>(g => g.ModifiedInventories).WithOne(o => o.ModifiedBy).HasForeignKey(o => o.ModifiedBy_UserId);


        }
    }
}
