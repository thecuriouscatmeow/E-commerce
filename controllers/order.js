const Order = require("../model/Order");


exports.getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    try{ 
        const income = await Order.aggregate([
            {$match: { createdAt: { $gte: previousMonth } } },
            { $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                        },
            },
            { $group: {
                    _id: $month,
                    total: { $sum: "$sales" },
                     },
            },
        ]);

    } catch (err) {
        res.status(500).json(err);
    }
}